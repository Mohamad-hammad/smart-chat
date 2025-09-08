import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AppDataSource } from '@/config/database';
import { User } from '@/entities/User';
import { Bot } from '@/entities/Bot';
import { Conversation } from '@/entities/Conversation';

// Helper function to save conversation
async function saveConversation(botId: string, userId: string, message: string, sender: 'user' | 'bot', isTestMessage: boolean = false, metadata?: Record<string, unknown>) {
  try {
    const conversationRepository = AppDataSource.getRepository(Conversation);
    
    const conversation = new Conversation();
    conversation.botId = botId;
    conversation.userId = userId;
    conversation.message = message;
    conversation.sender = sender;
    conversation.isTestMessage = isTestMessage;
    conversation.metadata = metadata ? JSON.stringify(metadata) : undefined;

    await conversationRepository.save(conversation);
    return conversation;
  } catch (error) {
    console.error('Error saving conversation:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Initialize database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // Get user from database
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ 
      where: { email: session.user.email } 
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { botId, message, userId, isTestMessage = false } = body;

    if (!botId || !message) {
      return NextResponse.json({ 
        error: 'Bot ID and message are required' 
      }, { status: 400 });
    }

    // Check if user is assigned to this bot (unless it's a test message from manager)
    if (!isTestMessage) {
      const { BotAssignment } = await import('@/entities/BotAssignment');
      const assignmentRepository = AppDataSource.getRepository(BotAssignment);
      const assignment = await assignmentRepository.findOne({
        where: {
          userId: user.id,
          botId: botId,
          status: 'active'
        }
      });

      if (!assignment) {
        return NextResponse.json({ error: 'Access denied. You are not assigned to this bot.' }, { status: 403 });
      }
    }

    // Get the bot from database
    const botRepository = AppDataSource.getRepository(Bot);
    const bot = await botRepository.findOne({
      where: { 
        id: botId,
        createdBy: user.id // Ensure the manager owns this bot
      }
    });

    if (!bot) {
      return NextResponse.json({ 
        error: 'Bot not found or you do not have permission to access it' 
      }, { status: 404 });
    }

    // Check if bot is active
    if (bot.status !== 'active') {
      return NextResponse.json({ 
        error: 'Bot is not active' 
      }, { status: 400 });
    }

    // Save user message to conversation
    await saveConversation(botId, user.id, message, 'user', isTestMessage);

    // Send message to n8n webhook or API
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    const n8nApiKey = process.env.N8N_API_KEY;
    
    if (!n8nWebhookUrl && !n8nApiKey) {
      console.log('N8N webhook URL not configured, returning intelligent mock response');
      
      // Generate intelligent responses based on the message content
      const lowerMessage = message.toLowerCase();
      let response = '';
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        response = `Hello! I'm ${bot.name}. How can I help you today?`;
      } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
        response = `I'm here to help! What do you need assistance with?`;
      } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        response = `You're welcome! Anything else I can help with?`;
      } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
        response = `Goodbye! Feel free to reach out anytime.`;
      } else if (lowerMessage.includes('what') || lowerMessage.includes('how') || lowerMessage.includes('why')) {
        response = `That's a great question! Could you provide more details?`;
      } else if (lowerMessage.includes('aoa') || lowerMessage.includes('salam') || lowerMessage.includes('assalam')) {
        response = `Wa Alaikum Assalam! I'm ${bot.name}. How can I help you?`;
      } else {
        response = `I'm ${bot.name}. How can I assist you with ${bot.domain}?`;
      }
      
      // Save bot response to conversation
      await saveConversation(botId, user.id, response, 'bot', isTestMessage);
      
      return NextResponse.json({
        response: response,
        success: true
      });
    }

    // If we have an N8N webhook URL, use it for AI responses
    if (n8nWebhookUrl) {
      try {
        console.log('Using N8N webhook for AI response');
        
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };
        
        if (n8nApiKey) {
          headers['Authorization'] = `Bearer ${n8nApiKey}`;
        }
        
        const n8nResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            message: message
          }),
        });

        if (n8nResponse.ok) {
          const n8nData = await n8nResponse.json();
          const botResponse = n8nData.response || n8nData.message || 'Message received successfully';
          
          // Save bot response to conversation
          await saveConversation(botId, user.id, botResponse, 'bot', isTestMessage, n8nData);
          
          return NextResponse.json({
            response: botResponse,
            success: true
          });
        } else {
          console.error('N8N webhook error:', n8nResponse.status, n8nResponse.statusText);
          // Fall back to intelligent response
        }
      } catch (n8nError) {
        console.error('Error calling N8N webhook:', n8nError);
        // Fall back to intelligent response
      }
    }


    // Final fallback - if neither API key nor webhook worked
    const fallbackResponse = `I'm ${bot.name}. How can I help you with ${bot.domain}?`;
    
    // Save bot response to conversation
    await saveConversation(botId, user.id, fallbackResponse, 'bot', isTestMessage);
    
    return NextResponse.json({
      response: fallbackResponse,
      success: true
    });

  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
