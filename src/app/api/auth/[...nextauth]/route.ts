import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { AppDataSource } from "@/config/database"
import { User } from "@/entities/User"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Initialize database connection
          if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
          }

          const userRepository = AppDataSource.getRepository(User);
          
          // Check if user already exists
          const existingUser = await userRepository.findOne({
            where: { email: user.email! }
          });

          if (!existingUser) {
            // Create new user with Google info
            const newUser = new User();
            newUser.email = user.email!;
            newUser.firstName = user.name?.split(' ')[0] || null;
            newUser.lastName = user.name?.split(' ').slice(1).join(' ') || null;
            newUser.isEmailVerified = true; // Google accounts are pre-verified
            newUser.isActive = true;
            newUser.role = 'user';
            
            // Generate a random password for Google users
            const randomPassword = Math.random().toString(36).slice(-10);
            newUser.password = await bcrypt.hash(randomPassword, 12);
            
            await userRepository.save(newUser);
            console.log('Google user created:', newUser.email);
          } else {
            // Update existing user if needed
            if (!existingUser.isEmailVerified) {
              existingUser.isEmailVerified = true;
              existingUser.isActive = true;
              await userRepository.save(existingUser);
            }
          }
          
          return true;
        } catch (error) {
          console.error('Error in Google sign in:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user) {
        token.provider = "google";
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.provider === "google" && session.user) {
        // Extend the session user type to include provider
        (session.user as { provider?: string }).provider = "google";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful sign in
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows relative callback URLs
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl + '/dashboard'
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
})

export { handler as GET, handler as POST }
