import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AppDataSource } from '@/config/database';
import { User } from '@/entities/User';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // We'll check the role from the database instead of session

    // Initialize database connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // First, get the current user to find their ID and verify role
    const userRepository = AppDataSource.getRepository(User);
    const currentUser = await userRepository.findOne({
      where: { email: session.user.email }
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'Current user not found' }, { status: 404 });
    }

    if (currentUser.role !== 'manager') {
      return NextResponse.json({ error: 'Access denied. Manager role required.' }, { status: 403 });
    }

    // Fetch users invited by this manager who have accepted their invitations
    const invitedUsers = await userRepository
      .createQueryBuilder('user')
      .where('user.invitedBy = :managerId', { managerId: currentUser.id })
      .andWhere('user.password IS NOT NULL') // Only users who have set a password (accepted invitation)
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.role',
        'user.createdAt'
      ])
      .getMany();

    // Transform the data to include status
    const usersWithStatus = invitedUsers.map(user => ({
      id: user.id,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      email: user.email,
      role: user.role,
      status: 'active', // All users in this list are active since they have passwords
      createdAt: user.createdAt
    }));

    return NextResponse.json({ users: usersWithStatus });

  } catch (error) {
    console.error('Error fetching manager users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
