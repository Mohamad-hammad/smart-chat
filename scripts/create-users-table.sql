-- Create users table for ChatBot Pro
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    isEmailVerified BOOLEAN DEFAULT FALSE,
    emailVerificationToken VARCHAR(255),
    passwordResetToken VARCHAR(255),
    passwordResetExpires TIMESTAMP,
    role VARCHAR(50) DEFAULT 'user',
    isActive BOOLEAN DEFAULT TRUE,
    lastLoginAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_email_verification_token ON users(emailVerificationToken);

-- Enable Row Level Security (RLS) for Supabase
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations" ON users FOR ALL USING (true) WITH CHECK (true);
