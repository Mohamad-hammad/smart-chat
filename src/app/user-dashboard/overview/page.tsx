'use client';

import React, { useState, useEffect } from 'react';
import { Bot, MessageSquare, BarChart3, Clock, TrendingUp, Users, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RoleGuard from '@/components/auth/RoleGuard';

interface UserStats {
  assignedBots: number;
  totalConversations: number;
  activeConversations: number;
  responseTime: string;
}

interface RecentActivity {
  id: string;
  type: string;
  bot: string;
  time: string;
  status: string;
}

export default function UserOverviewPage() {
  const [stats, setStats] = useState<UserStats>({
    assignedBots: 0,
    totalConversations: 0,
    activeConversations: 0,
    responseTime: '0 min'
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Fetch user analytics
        const analyticsResponse = await fetch('/api/user/analytics');
        const analyticsData = await analyticsResponse.json();
        
        if (analyticsData.stats) {
          setStats({
            assignedBots: analyticsData.stats.assignedBots,
            totalConversations: analyticsData.stats.totalConversations,
            activeConversations: analyticsData.stats.activeConversations,
            responseTime: analyticsData.stats.avgResponseTime
          });
        }

        if (analyticsData.recentActivity) {
          // Format recent activity with relative time
          const formattedActivity = analyticsData.recentActivity.map((activity: any) => ({
            ...activity,
            time: formatRelativeTime(activity.time)
          }));
          setRecentActivity(formattedActivity);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour ago`;
    return `${Math.floor(diffInMinutes / 1440)} day ago`;
  };

  if (loading) {
    return (
      <RoleGuard allowedRoles={['user']}>
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#6566F1] mx-auto mb-4" />
              <p className="text-gray-600">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={['user']}>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#6566F1] to-[#5A5BD9] rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="text-[#6566F1]/80">Here&apos;s what&apos;s happening with your assigned bots today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-gray-200 bg-white hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Assigned Bots</CardTitle>
            <Bot className="h-4 w-4 text-[#6566F1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.assignedBots}</div>
            <p className="text-xs text-gray-500">Active bots assigned to you</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-[#6566F1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalConversations}</div>
            <p className="text-xs text-gray-500">All time conversations</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Conversations</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#6566F1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.activeConversations}</div>
            <p className="text-xs text-gray-500">Currently ongoing</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-[#6566F1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.responseTime}</div>
            <p className="text-xs text-gray-500">Average response time</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-[#6566F1]" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#6566F1] rounded-full flex items-center justify-center">
                    {activity.type === 'conversation' ? (
                      <MessageSquare className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.type === 'conversation' ? 'New conversation' : 'Bot assigned'}: {activity.bot}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    activity.status === 'active' ? 'bg-green-100 text-green-800' :
                    activity.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-[#6566F1]" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <Bot className="w-5 h-5 text-[#6566F1]" />
                <span className="text-sm font-medium text-gray-900">View My Bots</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <MessageSquare className="w-5 h-5 text-[#6566F1]" />
                <span className="text-sm font-medium text-gray-900">View Conversations</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <BarChart3 className="w-5 h-5 text-[#6566F1]" />
                <span className="text-sm font-medium text-gray-900">View Analytics</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <Users className="w-5 h-5 text-[#6566F1]" />
                <span className="text-sm font-medium text-gray-900">Get Help</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </RoleGuard>
  );
}
