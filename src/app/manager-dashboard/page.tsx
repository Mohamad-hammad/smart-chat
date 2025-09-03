'use client';
import React from 'react';
import ManagerOverview from '@/components/dashboard/ManagerOverview';
import RoleGuard from '@/components/auth/RoleGuard';

export default function ManagerDashboardPage() {
  return (
    <RoleGuard allowedRoles={['manager']}>
      <ManagerOverview />
    </RoleGuard>
  );
}