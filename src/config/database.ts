import { DataSource } from "typeorm";
import { User } from "../entities/User";

// Use DATABASE_URL (pooled connection) for application operations
const databaseUrl = process.env.DATABASE_URL;

// Don't throw error during build time
if (!databaseUrl && process.env.NODE_ENV !== 'production' && !process.env.NEXT_PHASE) {
  console.warn('DATABASE_URL environment variable is not set');
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl || "postgresql://placeholder:placeholder@localhost:5432/placeholder",
  synchronize: false, // Set to false in production
  logging: process.env.NODE_ENV === "development",
  entities: [User],
  migrations: [],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false // Required for Supabase
  }
});

// Initialize the data source
export const initializeDatabase = async () => {
  try {
    // Check if DATABASE_URL is available before attempting to connect
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is required');
    }

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Database connection established successfully");
    } else {
      console.log("Database connection already established");
    }
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};
