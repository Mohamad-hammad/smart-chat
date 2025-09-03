# N8N Webhook Configuration for ChatBot Integration

## Overview
This document provides the configuration for integrating the ChatBot with n8n workflows to handle chatbot data, agent requests, and issue reports.

## Webhook Endpoints

### 1. Chatbot Conversations Webhook
**URL**: `https://your-n8n-instance.com/webhook/chatbot-conversations`
**Method**: POST
**Purpose**: Receive chatbot conversation data for analytics and processing

**Payload Structure**:
```json
{
  "id": "conversation_id",
  "message": "User message",
  "response": "Bot response",
  "timestamp": "2024-01-15T10:30:00Z",
  "userAgent": "Mozilla/5.0...",
  "ip": "192.168.1.1",
  "sessionId": "sess_123",
  "webhook_source": "chatbot"
}
```

### 2. Human Agent Request Webhook
**URL**: `https://your-n8n-instance.com/webhook/agent-request`
**Method**: POST
**Purpose**: Handle requests for human agent assistance

**Payload Structure**:
```json
{
  "id": "request_id",
  "type": "human_agent_request",
  "description": "User requested human agent assistance",
  "timestamp": "2024-01-15T10:45:00Z",
  "userAgent": "Mozilla/5.0...",
  "ip": "192.168.1.1",
  "sessionId": "sess_123",
  "status": "pending",
  "webhook_source": "chatbot"
}
```

### 3. Issue Report Webhook
**URL**: `https://your-n8n-instance.com/webhook/issue-report`
**Method**: POST
**Purpose**: Handle issue reports from users

**Payload Structure**:
```json
{
  "id": "report_id",
  "type": "issue_report",
  "issueType": "Bug Report",
  "description": "Issue description",
  "email": "user@example.com",
  "timestamp": "2024-01-15T09:15:00Z",
  "userAgent": "Mozilla/5.0...",
  "ip": "192.168.1.1",
  "sessionId": "sess_123",
  "status": "open",
  "priority": "high",
  "webhook_source": "chatbot"
}
```

## N8N Workflow Examples

### Workflow 1: Chatbot Analytics Processing
```json
{
  "name": "Chatbot Analytics Processing",
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "chatbot-conversations",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Process Conversation",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "// Process conversation data\nconst conversation = $input.first().json;\n\n// Extract insights\nconst insights = {\n  sentiment: analyzeSentiment(conversation.message),\n  intent: extractIntent(conversation.message),\n  category: categorizeMessage(conversation.message)\n};\n\nreturn {\n  ...conversation,\n  insights\n};"
      }
    },
    {
      "name": "Store in Database",
      "type": "n8n-nodes-base.postgres",
      "parameters": {
        "operation": "insert",
        "table": "chatbot_conversations",
        "columns": "id,message,response,timestamp,user_agent,ip,session_id,insights"
      }
    },
    {
      "name": "Update Analytics",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "// Update real-time analytics\nconst conversation = $input.first().json;\n\n// Update counters and metrics\nupdateAnalytics(conversation);\n\nreturn conversation;"
      }
    }
  ]
}
```

### Workflow 2: Human Agent Request Handler
```json
{
  "name": "Human Agent Request Handler",
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "agent-request",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Create Support Ticket",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://your-support-system.com/api/tickets",
        "method": "POST",
        "body": {
          "title": "Human Agent Request",
          "description": "{{ $json.description }}",
          "priority": "high",
          "source": "chatbot"
        }
      }
    },
    {
      "name": "Notify Agents",
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "channel": "#support",
        "text": "New human agent request from chatbot: {{ $json.description }}"
      }
    },
    {
      "name": "Send Email Notification",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "to": "support@yourcompany.com",
        "subject": "New Agent Request",
        "text": "A user has requested human agent assistance through the chatbot."
      }
    }
  ]
}
```

### Workflow 3: Issue Report Processing
```json
{
  "name": "Issue Report Processing",
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "issue-report",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Categorize Issue",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "// Categorize issue based on type and description\nconst issue = $input.first().json;\n\nlet category = 'general';\nlet assignee = 'support@yourcompany.com';\n\nif (issue.issueType === 'Bug Report') {\n  category = 'bug';\n  assignee = 'dev@yourcompany.com';\n} else if (issue.issueType === 'Feature Request') {\n  category = 'feature';\n  assignee = 'product@yourcompany.com';\n}\n\nreturn {\n  ...issue,\n  category,\n  assignee\n};"
      }
    },
    {
      "name": "Create GitHub Issue",
      "type": "n8n-nodes-base.github",
      "parameters": {
        "operation": "create",
        "repository": "your-repo/your-project",
        "title": "{{ $json.issueType }}: {{ $json.description }}",
        "body": "**Reported by**: {{ $json.email }}\n**Type**: {{ $json.issueType }}\n**Priority**: {{ $json.priority }}\n\n**Description**:\n{{ $json.description }}"
      }
    },
    {
      "name": "Send Confirmation Email",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "to": "{{ $json.email }}",
        "subject": "Issue Report Received",
        "text": "Thank you for reporting this issue. We have received your report and will investigate it shortly."
      }
    }
  ]
}
```

## Environment Variables
Add these to your n8n environment:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/chatbot_db

# External Services
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/slack/webhook
GITHUB_TOKEN=your_github_token
SUPPORT_EMAIL=support@yourcompany.com

# OpenAI
OPENAI_API_KEY=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
```

## Database Schema
Create these tables in your database:

```sql
-- Chatbot conversations table
CREATE TABLE chatbot_conversations (
  id VARCHAR(255) PRIMARY KEY,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  user_agent TEXT,
  ip VARCHAR(45),
  session_id VARCHAR(255),
  insights JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agent requests table
CREATE TABLE agent_requests (
  id VARCHAR(255) PRIMARY KEY,
  description TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  user_agent TEXT,
  ip VARCHAR(45),
  session_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  assigned_to VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Issue reports table
CREATE TABLE issue_reports (
  id VARCHAR(255) PRIMARY KEY,
  issue_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  email VARCHAR(255),
  timestamp TIMESTAMP NOT NULL,
  user_agent TEXT,
  ip VARCHAR(45),
  session_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'open',
  priority VARCHAR(20) DEFAULT 'medium',
  github_issue_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Setup Instructions

1. **Install n8n**: Follow the official n8n installation guide
2. **Create Webhooks**: Set up the webhook endpoints in n8n
3. **Import Workflows**: Import the provided workflow JSON files
4. **Configure Environment**: Set up the environment variables
5. **Database Setup**: Create the required database tables
6. **Test Integration**: Test the webhook endpoints with sample data

## Monitoring and Analytics

The chatbot data will be automatically processed and stored, providing insights into:
- User engagement patterns
- Common questions and issues
- Response effectiveness
- Agent request frequency
- Issue resolution tracking

This integration enables real-time monitoring of chatbot performance and automated handling of user requests through n8n workflows.
