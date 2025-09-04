# 🚀 Smart Chat - Deployment Guide

This guide will help you deploy the Smart Chat application to production.

## 📋 Prerequisites

- Node.js 18.x or higher
- PostgreSQL database (managed service recommended)
- Gmail account for email functionality
- Google Cloud Console account for OAuth
- Deployment platform account (Vercel, Netlify, Railway, etc.)

## 🗄️ Database Setup

### Option 1: Supabase (Recommended)
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > Database
3. Copy the connection string
4. Use the connection string as your `DATABASE_URL`

### Option 2: PlanetScale
1. Create a new database at [planetscale.com](https://planetscale.com)
2. Get the connection string from the dashboard
3. Use the connection string as your `DATABASE_URL`

### Option 3: AWS RDS
1. Create a PostgreSQL RDS instance
2. Configure security groups
3. Get the connection string from AWS console

## 🔐 Environment Variables Setup

### Required Variables

```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database_name

# NextAuth
NEXTAUTH_SECRET=your-secure-secret-key
NEXTAUTH_URL=https://your-domain.com

# Application
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password

# N8N (Optional)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/chat
```

### Generating NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

## 🔧 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
5. Set application type to "Web application"
6. Add authorized origins:
   - `https://your-domain.com`
   - `http://localhost:3000` (for development)
7. Copy Client ID and Client Secret

## 📧 Gmail SMTP Setup

1. Enable 2-Step Verification on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
3. Use the generated password as `EMAIL_APP_PASSWORD`

## 🚀 Deployment Platforms

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set Environment Variables**
   - Go to your project dashboard
   - Settings > Environment Variables
   - Add all required variables

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Netlify

1. **Connect Repository**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`

2. **Set Environment Variables**
   - Site settings > Environment variables
   - Add all required variables

### Railway

1. **Deploy from GitHub**
   - Connect your repository
   - Add PostgreSQL service
   - Set environment variables

2. **Configure Database**
   - Use the provided PostgreSQL connection string

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base
   
   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   
   # Install dependencies
   COPY package.json package-lock.json* ./
   RUN npm ci
   
   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   
   # Build the application
   RUN npm run build
   
   # Production image, copy all the files and run next
   FROM base AS runner
   WORKDIR /app
   
   ENV NODE_ENV production
   
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   
   EXPOSE 3000
   
   ENV PORT 3000
   
   CMD ["node", "server.js"]
   ```

2. **Build and Run**
   ```bash
   docker build -t smart-chat .
   docker run -p 3000:3000 --env-file .env.local smart-chat
   ```

## 🔍 Post-Deployment Checklist

### ✅ Database
- [ ] Database connection working
- [ ] Tables created automatically
- [ ] SSL connection enabled

### ✅ Authentication
- [ ] Google OAuth working
- [ ] User registration/login working
- [ ] Session management working

### ✅ Email
- [ ] User invitation emails sending
- [ ] Email verification working
- [ ] SMTP configuration correct

### ✅ Application Features
- [ ] Manager dashboard accessible
- [ ] Bot creation working
- [ ] User management working
- [ ] N8N integration working (if configured)

### ✅ Security
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Environment variables secured
- [ ] Database credentials protected

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify database is accessible
   - Check SSL configuration

2. **Google OAuth Not Working**
   - Verify authorized origins
   - Check client ID/secret
   - Ensure Google+ API is enabled

3. **Email Not Sending**
   - Check Gmail app password
   - Verify SMTP settings
   - Check email quotas

4. **Build Failures**
   - Check Node.js version
   - Verify all dependencies
   - Check environment variables

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
DEBUG=*
```

## 📊 Monitoring

### Recommended Tools
- **Uptime**: UptimeRobot, Pingdom
- **Errors**: Sentry, LogRocket
- **Performance**: Vercel Analytics, Google Analytics
- **Database**: Database monitoring from your provider

### Health Check Endpoint
The application includes a health check at `/api/health` (if implemented).

## 🔄 Updates and Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Monitor database performance
- [ ] Check error logs
- [ ] Backup database regularly
- [ ] Update security patches

### Scaling Considerations
- Use connection pooling for database
- Implement caching (Redis)
- Use CDN for static assets
- Consider horizontal scaling

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review application logs
3. Verify environment variables
4. Test locally with production settings

---

**Happy Deploying! 🎉**
