import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AppDataSource } from '@/config/database';
import { Conversation } from '@/entities/Conversation';
import { User } from '@/entities/User';
import { Bot } from '@/entities/Bot';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ botId: string }> }
) {
  try {
    // Initialize database
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // Get session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { botId } = await params;

    // Get user
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ 
      where: { email: session.user.email } 
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get conversations for the bot
    const conversationRepository = AppDataSource.getRepository(Conversation);
    const conversations = await conversationRepository.find({
      where: { 
        botId: botId,
        userId: user.id
      },
      order: { createdAt: 'ASC' },
      relations: ['bot', 'user']
    });

    // Format conversations for frontend
    const formattedConversations = conversations.map(conv => ({
      id: conv.id,
      message: conv.message,
      sender: conv.sender,
      timestamp: conv.createdAt.toISOString(),
      isTestMessage: conv.isTestMessage,
      metadata: conv.metadata ? JSON.parse(conv.metadata) : null
    }));

    return NextResponse.json({ 
      success: true, 
      conversations: formattedConversations 
    });

  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch conversations',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
