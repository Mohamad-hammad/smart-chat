'use client';

import React from 'react';
import DashboardLayoutWithAuth from '@/components/dashboard/DashboardLayoutWithAuth';
import Overview from '@/components/dashboard/Overview';

export default function DashboardPage() {
  return (
    <DashboardLayoutWithAuth activeSection="overview">
      <Overview />
    </DashboardLayoutWithAuth>
  );
}
