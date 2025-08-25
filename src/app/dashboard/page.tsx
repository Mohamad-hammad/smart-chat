'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Overview from '@/components/dashboard/Overview';

export default function DashboardPage() {
  return (
    <DashboardLayout activeSection="overview">
      <Overview />
    </DashboardLayout>
  );
}
