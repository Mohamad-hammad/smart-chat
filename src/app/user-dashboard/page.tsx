'use client';

import React from 'react';
import DashboardLayoutWithAuth from '@/components/dashboard/DashboardLayoutWithAuth';
import UserBots from '@/components/dashboard/UserBots';
import RoleGuard from '@/components/auth/RoleGuard';

export default function UserDashboardPage() {
  return (
    <RoleGuard allowedRoles={['user']}>
      <DashboardLayoutWithAuth activeSection="bots">
        <UserBots />
      </DashboardLayoutWithAuth>
    </RoleGuard>
  );
}
