import { DataSource } from "typeorm";
import { User } from "../entities/User";

// Use DATABASE_URL (pooled connection) for application operations
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
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
