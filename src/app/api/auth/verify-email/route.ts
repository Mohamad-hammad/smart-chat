import { NextRequest, NextResponse } from 'next/server';
import { EmailVerificationService } from '@/services/emailVerificationService';
import { AppDataSource } from '@/config';

export async function GET(request: NextRequest) {
  try {
    // Initialize database connection only if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Verify the email
    const result = await EmailVerificationService.verifyEmail(token);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        user: {
          id: result.user?.id,
          email: result.user?.email,
          firstName: result.user?.firstName,
          lastName: result.user?.lastName,
          role: result.user?.role
        }
      });
    } else {
      // Return 400 for invalid/expired tokens, but include the specific error message
      return NextResponse.json(
        { 
          success: false,
          error: result.message 
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate verification URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const verificationUrl = `${baseUrl}/verify-email?token=NEW_TOKEN`;

    // Resend verification email
    const result = await EmailVerificationService.resendVerificationEmail(email, verificationUrl);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      });
    } else {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Resend verification email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
