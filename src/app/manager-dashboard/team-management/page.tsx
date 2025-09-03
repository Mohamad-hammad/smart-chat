'use client';
import React from 'react';
import TeamManagement from '@/components/dashboard/TeamManagement';
import RoleGuard from '@/components/auth/RoleGuard';

export default function TeamManagementPage() {
  return (
    <RoleGuard allowedRoles={['manager', 'admin']}>
      <TeamManagement />
    </RoleGuard>
  );
}
