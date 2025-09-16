import { NextResponse } from 'next/server';
import { AppDataSource, initializeDatabase } from '@/config/database';

export async function GET() {
  try {
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'unknown',
        email: 'unknown',
        auth: 'unknown',
        databaseError: undefined as string | undefined
      },
      // Add debug info in development or debug mode
      ...(process.env.NODE_ENV === 'development' || process.env.DATABASE_DEBUG === 'true' ? {
        debug: {
          hasDatabaseUrl: !!process.env.DATABASE_URL,
          hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
          hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
          nodeTlsRejectUnauthorized: process.env.NODE_TLS_REJECT_UNAUTHORIZED,
          databaseUrlMasked: process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@')
        }
      } : {})
    };

    // Check database connection using our enhanced initialization
    try {
      await initializeDatabase();
      await AppDataSource.query('SELECT 1');
      healthCheck.services.database = 'healthy';
    } catch (error) {
      healthCheck.services.database = 'unhealthy';
      healthCheck.status = 'degraded';
      
      // Add error details in development or debug mode
      if (process.env.NODE_ENV === 'development' || process.env.DATABASE_DEBUG === 'true') {
        healthCheck.services.databaseError = (error as Error).message;
      }
    }

    // Check email configuration
    if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
      healthCheck.services.email = 'configured';
    } else {
      healthCheck.services.email = 'not_configured';
    }

    // Check auth configuration
    if (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_URL) {
      healthCheck.services.auth = 'configured';
    } else {
      healthCheck.services.auth = 'not_configured';
    }

    const statusCode = healthCheck.status === 'healthy' ? 200 : 503;
    
    return NextResponse.json(healthCheck, { status: statusCode });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed'
      },
      { status: 503 }
    );
  }
}
