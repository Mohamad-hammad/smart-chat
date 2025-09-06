'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      return; // Still loading
    }

    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (session?.user) {
      const userRole = 'role' in session.user ? session.user.role : 'user';
      
      // Redirect to appropriate dashboard based on user role
      if (userRole === 'admin') {
        router.push('/admin-dashboard');
      } else if (userRole === 'manager') {
        router.push('/manager-dashboard');
      } else {
        router.push('/user-dashboard');
      }
    }
  }, [session, status, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6566F1] mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
