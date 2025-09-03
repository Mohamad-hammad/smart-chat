import React from 'react';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/adminAuth';
import ChatbotAnalyticsClient from './ChatbotAnalyticsClient';

export default async function ChatbotAnalyticsPage() {
  // Check if user is admin
  const adminStatus = await isAdmin();
  
  if (!adminStatus) {
    redirect('/dashboard');
  }

  return <ChatbotAnalyticsClient />;
}