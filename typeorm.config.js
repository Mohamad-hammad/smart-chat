require("dotenv").config({ path: '.env.local' });
const { DataSource } = require("typeorm");
require("reflect-metadata");

// Use DIRECT_URL for migrations (direct database connection needed)
// Use DATABASE_URL for regular app operations (pooled connection)
const connectionUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionUrl) {
  console.error('No database connection URL found. Please set DIRECT_URL or DATABASE_URL in your .env.local file');
  process.exit(1);
}

const config = {
  type: "postgres",
  url: connectionUrl,
  synchronize: false, // Disable after table creation
  logging: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false // Required for Supabase
  }
};

module.exports = new DataSource(config);
