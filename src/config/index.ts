import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { Bot } from "../entities/Bot";
import { BotAssignment } from "../entities/BotAssignment";
import { Conversation } from "../entities/Conversation";
import { Subscription } from "../entities/Subscription";
import { BillingPlan } from "../entities/BillingPlan";
import { Invoice } from "../entities/Invoice";
import { ChatbotIssue } from "../entities/ChatbotIssue";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
  synchronize: true,
  logging: false,
  entities: [User, Bot, BotAssignment, Conversation, Subscription, BillingPlan, Invoice, ChatbotIssue],
  migrations: [],
  subscribers: [],
});

// Initialize the data source
export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  } catch (error) {
    throw error;
  }
};
