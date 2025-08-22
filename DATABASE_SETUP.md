# Database Setup Guide

This guide will help you set up TypeORM with Supabase for your Next.js project.

## Prerequisites

- Node.js and npm installed
- Supabase account and project
- PostgreSQL database access

## Installation

The required packages have already been installed:
- `typeorm` - ORM for database operations
- `reflect-metadata` - Required for TypeORM decorators
- `pg` - PostgreSQL driver
- `bcryptjs` - Password hashing

## Configuration

### 1. Environment Variables

Create a `.env.local` file in your project root with your Supabase credentials:

```bash
# Supabase Database Configuration
SUPABASE_DB_HOST=db.your-project-ref.supabase.co
SUPABASE_DB_PORT=5432
SUPABASE_DB_USERNAME=postgres
SUPABASE_DB_PASSWORD=your-database-password
SUPABASE_DB_NAME=postgres

# Environment
NODE_ENV=development
```

### 2. Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > Database
3. Copy the connection string or individual credentials
4. Update your `.env.local` file

## Database Setup

### 1. Run Migration

To create the users table, run the migration:

```bash
npm run migration:run
```

### 2. Verify Table Creation

You can check if the table was created in your Supabase dashboard under Table Editor.

## API Endpoints

### Signup
- **POST** `/api/auth/signup`
- **Body**: `{ email, password, firstName?, lastName? }`

### Login
- **POST** `/api/auth/login`
- **Body**: `{ email, password }`

## Usage

### 1. Import the AuthForm Component

```tsx
import AuthForm from '@/components/AuthForm';

// For signup
<AuthForm mode="signup" />

// For login
<AuthForm mode="login" />
```

### 2. Use UserService in Your Code

```tsx
import { UserService } from '@/services/userService';

// Create user
const user = await UserService.createUser({
  email: 'user@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe'
});

// Authenticate user
const user = await UserService.authenticateUser('user@example.com', 'password123');
```

## Available Scripts

- `npm run migration:run` - Run pending migrations
- `npm run migration:revert` - Revert last migration
- `npm run schema:sync` - Sync database schema with entities

## File Structure

```
src/
├── config/
│   └── database.ts          # Database configuration
├── entities/
│   └── User.ts             # User entity definition
├── services/
│   └── userService.ts      # User business logic
├── migrations/
│   └── 1700000000000-CreateUsersTable.ts  # Users table migration
└── app/
    └── api/
        └── auth/
            ├── signup/
            │   └── route.ts # Signup API endpoint
            └── login/
                └── route.ts # Login API endpoint
```

## Security Features

- Password hashing with bcrypt
- Input validation
- Error handling
- Unique email constraints
- Account activation status

## Troubleshooting

### Common Issues

1. **Connection Error**: Check your Supabase credentials in `.env.local`
2. **Migration Error**: Ensure your database is accessible and credentials are correct
3. **Entity Not Found**: Make sure all entities are imported in `database.ts`

### Debug Mode

Set `NODE_ENV=development` to enable detailed logging for database operations.

## Next Steps

1. Test the signup and login functionality
2. Add JWT token authentication
3. Implement email verification
4. Add password reset functionality
5. Create protected routes
6. Add user profile management
