# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your ChatBot Pro application.

## Prerequisites

- A Google Cloud Console account
- Access to your Supabase project

## Step 1: Create Google OAuth Credentials

### 1. Go to Google Cloud Console
- Visit [console.cloud.google.com](https://console.cloud.google.com)
- Create a new project or select an existing one

### 2. Enable Google+ API
- Go to **APIs & Services** → **Library**
- Search for **"Google+ API"** and enable it
- Also enable **"Google Identity"** if available

### 3. Create OAuth 2.0 Credentials
- Go to **APIs & Services** → **Credentials**
- Click **"Create Credentials"** → **"OAuth 2.0 Client IDs"**
- Choose **"Web application"** as the application type

### 4. Configure OAuth Consent Screen
- Set **Application name**: "ChatBot Pro"
- Set **User support email**: Your email address
- Set **Developer contact information**: Your email address
- Add **Authorized domains**: `localhost` (for development)

### 5. Set Authorized Redirect URIs
Add these redirect URIs:
- `http://localhost:3000/api/auth/callback/google` (for development)
- `https://yourdomain.com/api/auth/callback/google` (for production)

### 6. Get Your Credentials
- Copy the **Client ID** and **Client Secret**
- You'll need these for your environment variables

## Step 2: Update Environment Variables

Add these to your `.env.local` file:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# NextAuth Configuration
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## Step 3: Generate NextAuth Secret

Generate a random secret key:

```bash
# Option 1: Use openssl
openssl rand -base64 32

# Option 2: Use node
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Step 4: Test the Integration

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Visit the signup page** at `/signup`
3. **Click "Sign up with Google"**
4. **Complete the Google OAuth flow**
5. **Verify user creation** in your Supabase database

## Features

✅ **Automatic User Creation**: Google users are automatically created in your database
✅ **Email Verification**: Google accounts are pre-verified
✅ **Seamless Login**: Users can sign in with Google on subsequent visits
✅ **Profile Information**: Automatically extracts name from Google profile

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI"**
   - Make sure the redirect URI in Google Console matches exactly
   - Check for trailing slashes or protocol mismatches

2. **"Client ID not found"**
   - Verify your environment variables are set correctly
   - Restart your development server after changing env vars

3. **"OAuth consent screen not configured"**
   - Complete the OAuth consent screen setup in Google Console
   - Add your domain to authorized domains

### Security Notes:

- **Never commit** your `.env.local` file to version control
- **Rotate secrets** regularly in production
- **Use HTTPS** in production for secure OAuth flows

## Production Deployment

When deploying to production:

1. **Update redirect URIs** in Google Console
2. **Set production environment variables**
3. **Use HTTPS** for all OAuth callbacks
4. **Configure proper domain** in OAuth consent screen

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure Google OAuth is properly configured
4. Check Supabase database connection

---

**Happy coding! 🚀**
