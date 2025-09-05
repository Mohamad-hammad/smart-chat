'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles, 
  redirectTo = '/login' 
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      
      if (allowedRoles.includes(userRole as string)) {
        setIsAuthorized(true);
      } else {
        // Redirect to appropriate dashboard based on user role
        if (userRole === 'admin') {
          router.push('/admin-dashboard');
        } else if (userRole === 'manager') {
          router.push('/manager-dashboard');
        } else {
          router.push('/user-dashboard');
        }
      }
    }
    
    setIsLoading(false);
  }, [session, status, router, allowedRoles]);

  if (isLoading || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6566F1] mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect, so don't render anything
  }

  return <>{children}</>;
};

export default RoleGuard;
