'use client';
import React from 'react';
import HumanHandoff from '@/components/dashboard/HumanHandoff';
import RoleGuard from '@/components/auth/RoleGuard';

export default function HumanHandoffPage() {
  return (
    <RoleGuard allowedRoles={['manager', 'admin']}>
      <HumanHandoff />
    </RoleGuard>
  );
}
