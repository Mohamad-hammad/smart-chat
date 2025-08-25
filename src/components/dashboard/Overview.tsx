'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bot, 
  MessageSquare, 
  Users, 
  Clock,
  Plus,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Overview = () => {
  const router = useRouter();

  const stats = [
    { 
      title: "Active Bots", 
      value: "12", 
      change: "+2 this month", 
      icon: Bot, 
      color: "text-blue-600"
    },
    { 
      title: "Conversations Today", 
      value: "1,247", 
      change: "+12% from yesterday", 
      icon: MessageSquare, 
      color: "text-green-600"
    },
    { 
      title: "Active Users", 
      value: "8,429", 
      change: "+5% this week", 
      icon: Users, 
      color: "text-purple-600"
    },
    { 
      title: "Avg Response Time", 
      value: "1.2s", 
      change: "-0.3s improvement", 
      icon: Clock, 
      color: "text-orange-600"
    },
  ];

  const recentBots = [
    { name: "Support Assistant", status: "Active", chats: 342, lastActive: "2 min ago" },
    { name: "Sales Bot", status: "Active", chats: 189, lastActive: "1 hour ago" },
    { name: "FAQ Helper", status: "Draft", chats: 0, lastActive: "Never" },
    { name: "Product Guide", status: "Active", chats: 87, lastActive: "5 min ago" },
  ];

  const getStatusColor = (status: string) => {
    return status === "Active" 
      ? "text-green-600" 
      : "text-gray-500";
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="space-y-6">
      {/* Page Title and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your bots today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-gray-300 hover:bg-gray-50 text-gray-700"
            onClick={() => handleNavigation('/dashboard/analytics')}
          >
            <BarChart3 className="w-4 h-4 mr-2 text-[#6566F1]" />
            View Analytics
          </Button>
          <Button 
            className="bg-[#6566F1] hover:bg-[#5A5BD9] text-white"
            onClick={() => handleNavigation('/dashboard/bots')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Bot
          </Button>
        </div>
      </div>

      {/* Transform Your Customer Support Section */}
      <Card className="border border-gray-200 bg-white">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Before</h3>
              <p className="text-gray-700 text-sm">
                Managing bots feels overwhelming—you don&apos;t know where to start, and customers wait too long for responses.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">After</h3>
              <p className="text-gray-700 text-sm">
                See all your bots, usage, and quick actions in one place. Instant responses, happy customers.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Bridge</h3>
              <p className="text-gray-700 text-sm">
                Our overview gives you clarity and control from day one. Everything you need is right here.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600">
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Section Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage This Month */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">Usage This Month</CardTitle>
            <CardDescription className="text-gray-600">
              Conversations used in your current plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold text-gray-900">
              8,429 of 10,000 conversations
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#6566F1] h-2 rounded-full" style={{ width: '84%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">84%</span>
              <span className="text-sm text-gray-600">1,571 remaining</span>
            </div>
            <Button 
              variant="outline" 
              className="w-full border-gray-300 hover:bg-gray-50 text-gray-700"
              onClick={() => handleNavigation('/dashboard/billing')}
            >
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600">
              Get started with common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div 
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => handleNavigation('/dashboard/bots')}
            >
              <Plus className="w-4 h-4 text-[#6566F1]" />
              <span className="text-gray-700">Create New Bot</span>
            </div>
            <div 
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => handleNavigation('/dashboard/bots')}
            >
              <Bot className="w-4 h-4 text-[#6566F1]" />
              <span className="text-gray-700">Manage Bots</span>
            </div>
            <div 
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => handleNavigation('/dashboard/analytics')}
            >
              <BarChart3 className="w-4 h-4 text-[#6566F1]" />
              <span className="text-gray-700">View Analytics</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bots */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">Recent Bots</CardTitle>
            <CardDescription className="text-gray-600">
              Your most recently updated bots
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentBots.map((bot, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{bot.name}</span>
                    <span className={`text-sm ${getStatusColor(bot.status)}`}>
                      {bot.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {bot.chats} chats
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {bot.lastActive}
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Button 
                variant="link" 
                className="text-[#6566F1] hover:text-[#5A5BD9] p-0 h-auto"
                onClick={() => handleNavigation('/dashboard/bots')}
              >
                View all bots <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
