'use client';

import React from 'react';
import DashboardLayoutWithAuth from '@/components/dashboard/DashboardLayoutWithAuth';
import Overview from '@/components/dashboard/Overview';
import RoleGuard from '@/components/auth/RoleGuard';

export default function UserDashboardPage() {
  return (
    <RoleGuard allowedRoles={['user']}>
      <DashboardLayoutWithAuth activeSection="overview">
        <Overview />
      </DashboardLayoutWithAuth>
    </RoleGuard>
  );
}
