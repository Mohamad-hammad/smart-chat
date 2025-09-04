import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AppDataSource } from '@/config/database';
import { User } from '@/entities/User';
import { Bot } from '@/entities/Bot';

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
    const { botId, message, userId } = body;

    if (!botId || !message) {
      return NextResponse.json({ 
        error: 'Bot ID and message are required' 
      }, { status: 400 });
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

    // Send message to n8n webhook
    try {
      const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL || '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          botId: bot.id,
          botName: bot.name,
          message: message,
          userId: userId || 'test-user',
          userEmail: user.email,
          timestamp: new Date().toISOString()
        }),
      });

      if (n8nResponse.ok) {
        const n8nData = await n8nResponse.json();
        return NextResponse.json({
          response: n8nData.response || n8nData.message || 'Message received successfully',
          success: true
        });
      } else {
        console.error('N8N webhook error:', n8nResponse.status, n8nResponse.statusText);
        return NextResponse.json({
          response: 'I received your message but I\'m having trouble processing it right now. Please try again.',
          success: false
        });
      }
    } catch (n8nError) {
      console.error('Error calling n8n webhook:', n8nError);
      return NextResponse.json({
        response: 'I\'m currently unavailable. Please try again later.',
        success: false
      });
    }

  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
