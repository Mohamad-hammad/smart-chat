import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Bot } from "../entities/Bot";
import { BotAssignment } from "../entities/BotAssignment";
import { Conversation } from "../entities/Conversation";
import { Subscription } from "../entities/Subscription";
import { BillingPlan } from "../entities/BillingPlan";
import { Invoice } from "../entities/Invoice";
import { ChatbotIssue } from "../entities/ChatbotIssue";

// Environment-specific database configuration
const getDatabaseConfig = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  
  // During Next.js build process, don't validate environment variables
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return {
      url: 'postgresql://placeholder:placeholder@localhost:5432/placeholder',
      synchronize: false,
      logging: false
    };
  }
  
  if (nodeEnv === 'test') {
    // Test environment - use test database or fail if not configured
    const testDbUrl = process.env.TEST_DATABASE_URL;
    if (!testDbUrl) {
      throw new Error('TEST_DATABASE_URL is required for test environment');
    }
    return {
      url: testDbUrl,
      synchronize: true, // Allow schema changes in test
      logging: false
    };
  }
  
  if (nodeEnv === 'production') {
    // Production environment - strict validation
    const prodDbUrl = process.env.DATABASE_URL;
    if (!prodDbUrl) {
      throw new Error('DATABASE_URL is required in production environment');
    }
    
    // Add SSL parameters to the connection string for production
    const urlWithSSL = prodDbUrl.includes('?') 
      ? `${prodDbUrl}&sslmode=require&sslcert=&sslkey=&sslrootcert=`
      : `${prodDbUrl}?sslmode=require&sslcert=&sslkey=&sslrootcert=`;
    
    return {
      url: urlWithSSL,
      synchronize: false, // Never auto-sync in production
      logging: false
    };
  }
  
  // Development environment
  const devDbUrl = process.env.DATABASE_URL;
  if (!devDbUrl) {
    throw new Error('DATABASE_URL is required for development environment');
  }
  return {
    url: devDbUrl,
    synchronize: true, // Allow schema changes in development
    logging: true,
    nodeEnv: nodeEnv // Add nodeEnv to the config
  };
};

// Create data source with environment-specific config
const config = getDatabaseConfig();
// Database config logging removed for production

// Create a more robust database configuration
const createDataSourceConfig = () => {
  const baseConfig = {
    type: "postgres" as const,
    url: config.url,
    synchronize: config.synchronize,
    logging: config.logging,
    entities: [User, Bot, BotAssignment, Conversation, Subscription, BillingPlan, Invoice, ChatbotIssue],
    migrations: [],
    subscribers: [],
  };

  // Production SSL configuration
  if (process.env.NODE_ENV === 'production') {
    return {
      ...baseConfig,
      ssl: {
        rejectUnauthorized: false,
        require: true,
      },
      extra: {
        max: 20,
        min: 5,
        acquire: 30000,
        idle: 10000,
        ssl: {
          rejectUnauthorized: false,
          require: true,
        }
      }
    };
  }

  // Development configuration
  return {
    ...baseConfig,
    extra: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000,
    }
  };
};

export const AppDataSource = new DataSource(createDataSourceConfig());

// Initialize the data source with retry logic
export const initializeDatabase = async (retries = 3) => {
  // Set NODE_TLS_REJECT_UNAUTHORIZED for production to handle self-signed certificates
  if (process.env.NODE_ENV === 'production') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }
  
  for (let i = 0; i < retries; i++) {
    try {
      if (!AppDataSource.isInitialized) {
        console.log(`Attempting database connection (attempt ${i + 1}/${retries})`);
        console.log('Environment:', process.env.NODE_ENV);
        console.log('NODE_TLS_REJECT_UNAUTHORIZED:', process.env.NODE_TLS_REJECT_UNAUTHORIZED);
        console.log('SSL Config:', (AppDataSource.options as any).ssl);
        console.log('Extra SSL Config:', (AppDataSource.options as any).extra?.ssl);
        console.log('Connection URL (masked):', config.url.replace(/:[^:@]+@/, ':****@'));
        await AppDataSource.initialize();
        console.log('Database connection established successfully');
        return;
      }
    } catch (error) {
      console.error(`Database connection attempt ${i + 1} failed:`, error);
      console.error('Error details:', {
        message: (error as Error).message,
        code: (error as any).code,
        ssl: (AppDataSource.options as any).ssl,
        extraSsl: (AppDataSource.options as any).extra?.ssl
      });
      
      if (i === retries - 1) {
        console.error('All database connection attempts failed');
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, i) * 1000;
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Remove automatic initialization - let each API route handle it
// AppDataSource.initialize().catch(console.error);
