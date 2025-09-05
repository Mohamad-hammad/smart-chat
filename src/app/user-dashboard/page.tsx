'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import RoleGuard from '@/components/auth/RoleGuard';

export default function UserDashboardPage() {
  const router = useRouter();
  
  // Redirect to overview page
  React.useEffect(() => {
    router.replace('/user-dashboard/overview');
  }, [router]);

  return (
    <RoleGuard allowedRoles={['user']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6566F1] mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting to overview...</p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
