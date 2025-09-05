import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '@/config/database';
import { User } from '@/entities/User';
import { UserRole } from '@/types/UserRole';
import { EmailVerificationService } from '@/services/emailVerificationService';

export async function POST(request: NextRequest) {
  try {
    // Initialize database connection only if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    
    const { email, password, firstName, lastName } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { 
          error: 'An account with this email already exists. Please try logging in instead.',
          code: 'EMAIL_EXISTS'
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification token
    const verificationToken = EmailVerificationService.generateVerificationToken();

    // Check if this is the first user (should be manager)
    const userCount = await userRepository.count();
    const isFirstUser = userCount === 0;

    // Create user (not verified yet)
    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.firstName = firstName || null;
    user.lastName = lastName || null;
    user.isEmailVerified = false;
    user.emailVerificationToken = verificationToken;
    user.isActive = false; // User is inactive until email is verified
    user.role = isFirstUser ? UserRole.MANAGER : UserRole.USER; // First user becomes manager

    // Save user to database
    await userRepository.save(user);

    // Generate verification URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;

    // Send verification email
    const emailSent = await EmailVerificationService.sendVerificationEmail(user, verificationUrl);

    if (!emailSent) {
      // If email fails, delete the user and return error
      await userRepository.remove(user);
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      message: 'Account created successfully! Please check your email to verify your account.',
      userId: user.id,
      email: user.email
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
