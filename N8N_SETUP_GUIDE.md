# N8N Setup Guide for Smart Chat Bot

## Why N8N is Not Working

Currently, N8N is not working because:
1. ❌ No N8N webhook URL is configured in your `.env.local` file
2. ❌ No N8N instance is running or set up
3. ❌ The bot is using fallback responses instead of N8N integration

## Quick Setup Options

### Option 1: N8N Cloud (Easiest - Recommended)

1. **Sign up for N8N Cloud**:
   - Go to [https://n8n.cloud](https://n8n.cloud)
   - Create a free account
   - You get 1,000 executions per month for free

2. **Create a Webhook Workflow**:
   - In your N8N Cloud dashboard, create a new workflow
   - Add a "Webhook" node
   - Set the HTTP method to "POST"
   - Copy the webhook URL (it will look like: `https://app.n8n.cloud/webhook/your-webhook-id`)

3. **Add the Webhook URL to your environment**:
   ```bash
   # Add this line to your .env.local file
   N8N_WEBHOOK_URL=https://app.n8n.cloud/webhook/your-webhook-id
   ```

4. **Create a simple response workflow**:
   ```json
   {
     "nodes": [
       {
         "name": "Webhook",
         "type": "n8n-nodes-base.webhook",
         "parameters": {
           "httpMethod": "POST"
         }
       },
       {
         "name": "Respond",
         "type": "n8n-nodes-base.respondToWebhook",
         "parameters": {
           "responseBody": "={{ $json.message }}"
         }
       }
     ]
   }
   ```

### Option 2: Local N8N Installation

1. **Install N8N globally**:
   ```bash
   npm install -g n8n
   ```

2. **Start N8N**:
   ```bash
   n8n start
   ```

3. **Access N8N**:
   - Open [http://localhost:5678](http://localhost:5678)
   - Create your first workflow

4. **Create a webhook workflow**:
   - Add a "Webhook" node
   - Set HTTP method to "POST"
   - Copy the webhook URL (e.g., `http://localhost:5678/webhook/your-webhook-id`)

5. **Add to environment**:
   ```bash
   # Add this line to your .env.local file
   N8N_WEBHOOK_URL=http://localhost:5678/webhook/your-webhook-id
   ```

### Option 3: Docker N8N (Advanced)

1. **Create docker-compose.yml**:
   ```yaml
   version: '3.8'
   services:
     n8n:
       image: n8nio/n8n
       ports:
         - "5678:5678"
       environment:
         - N8N_BASIC_AUTH_ACTIVE=true
         - N8N_BASIC_AUTH_USER=admin
         - N8N_BASIC_AUTH_PASSWORD=password
       volumes:
         - n8n_data:/home/node/.n8n
   
   volumes:
     n8n_data:
   ```

2. **Start with Docker**:
   ```bash
   docker-compose up -d
   ```

3. **Access and configure**:
   - Open [http://localhost:5678](http://localhost:5678)
   - Login with admin/password
   - Create webhook workflow

## Current Bot Behavior

Right now, your bot is working with **intelligent fallback responses**:

- ✅ **Greetings**: "Hello! I'm Law Consultant, your Legal Services assistant. How can I help you today?"
- ✅ **Questions**: "That's a great question! As your Legal Services assistant, I'd be happy to help you with that."
- ✅ **Arabic/Urdu**: "Wa Alaikum Assalam! I'm Law Consultant, your Legal Services assistant. How can I assist you today?"

## Testing N8N Integration

Once you set up N8N:

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Test the bot**:
   - Go to the test bot page
   - Send a message
   - Check the terminal logs for N8N webhook calls

3. **Check logs**:
   ```bash
   # Look for these logs in your terminal:
   # "N8N webhook URL not configured, returning intelligent mock response" (current)
   # "N8N webhook error:" (if N8N is configured but not responding)
   # No error logs (if N8N is working properly)
   ```

## Advanced N8N Workflow Example

Here's a more sophisticated workflow that can handle different types of messages:

```json
{
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "httpMethod": "POST"
      }
    },
    {
      "name": "Process Message",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "// Get the incoming message\nconst message = $input.first().json.message;\nconst botName = $input.first().json.botName;\nconst domain = $input.first().json.domain || 'assistant';\n\n// Simple response logic\nlet response = '';\n\nif (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {\n  response = `Hello! I'm ${botName}, your ${domain} assistant. How can I help you today?`;\n} else if (message.toLowerCase().includes('help')) {\n  response = `I'm here to help! As your ${domain} assistant, I can assist you with various questions and tasks.`;\n} else {\n  response = `I understand you're asking about "${message}". As your ${domain} assistant, I'm here to help. Could you provide more details?`;\n}\n\nreturn {\n  response: response,\n  success: true\n};"
      }
    },
    {
      "name": "Respond",
      "type": "n8n-nodes-base.respondToWebhook",
      "parameters": {
        "responseBody": "={{ $json }}"
      }
    }
  ]
}
```

## Troubleshooting

### Common Issues:

1. **"N8N webhook URL not configured"**:
   - Add `N8N_WEBHOOK_URL` to your `.env.local` file
   - Restart your development server

2. **"N8N webhook error"**:
   - Check if N8N is running
   - Verify the webhook URL is correct
   - Check N8N workflow is active

3. **Bot not responding**:
   - Check browser console for errors
   - Check terminal logs for API errors
   - Verify the webhook workflow is set up correctly

### Debug Commands:

```bash
# Check if N8N webhook URL is set
grep -i "n8n" .env.local

# Test webhook URL manually
curl -X POST https://your-n8n-webhook-url \
  -H "Content-Type: application/json" \
  -d '{"message": "test", "botName": "Test Bot"}'

# Check N8N logs (if running locally)
docker logs n8n_container_name
```

## Next Steps

1. **Choose your setup option** (N8N Cloud recommended)
2. **Create a webhook workflow**
3. **Add the webhook URL to your environment**
4. **Restart your development server**
5. **Test the bot integration**

The bot will automatically switch from fallback responses to N8N integration once the webhook URL is configured!
