'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  Link as LinkIcon,
  User,
  Bot,
  MessageCircle,
  ArrowUp,
  ArrowDown,
  Star,
  UserCheck
} from 'lucide-react';

const ManagerOverview = () => {
  // Mock data for metrics
  const metrics = [
    {
      title: "Total Agents",
      value: "12",
      change: "+2 from last month",
      changeType: "positive",
      icon: Users,
      iconColor: "text-gray-600"
    },
    {
      title: "Active Chats",
      value: "8",
      change: "-3 from last hour",
      changeType: "negative",
      icon: MessageSquare,
      iconColor: "text-gray-600"
    },
    {
      title: "Pending Handoffs",
      value: "3",
      change: "Requires immediate attention",
      changeType: "warning",
      icon: Clock,
      iconColor: "text-gray-600"
    },
    {
      title: "Resolved Today",
      value: "24",
      change: "+12% from yesterday",
      changeType: "positive",
      icon: CheckCircle,
      iconColor: "text-gray-600"
    }
  ];

  // Mock data for connected users metrics
  const connectedMetrics = [
    {
      title: "Total Users",
      value: "8",
      icon: Users,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      textColor: "text-blue-600"
    },
    {
      title: "Total Bots",
      value: "6",
      icon: Bot,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      textColor: "text-green-600"
    },
    {
      title: "Available Agents",
      value: "12",
      icon: MessageCircle,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      textColor: "text-purple-600"
    }
  ];

  // Mock data for users
  const users = [
    {
      name: "John Doe",
      email: "john@techcorp.com",
      initials: "JD",
      badges: [
        { text: "Pro", color: "bg-gray-600 text-white" },
        { text: "active", color: "bg-purple-100 text-purple-600" }
      ],
      bots: "3 bots",
      lastActive: "Last: 2 hours ago"
    },
    {
      name: "Jane Smith",
      email: "jane@techcorp.com",
      initials: "JS",
      badges: [
        { text: "Business", color: "bg-gray-600 text-white" },
        { text: "active", color: "bg-purple-100 text-purple-600" }
      ],
      bots: "2 bots",
      lastActive: "Last: 30 minutes ago"
    },
    {
      name: "Mike Johnson",
      email: "mike@techcorp.com",
      initials: "MJ",
      badges: [
        { text: "Starter", color: "bg-gray-100 text-gray-600" },
        { text: "inactive", color: "bg-gray-100 text-gray-600" }
      ],
      bots: "1 bots",
      lastActive: "Last: 3 days ago"
    }
  ];

  // Mock data for recent activity
  const recentActivity = [
    {
      icon: MessageSquare,
      title: "Handoff to Sarah Chen",
      description: "Customer: John Doe • 2 min ago",
      status: "active",
      statusColor: "bg-purple-100 text-purple-600"
    },
    {
      icon: CheckCircle,
      title: "Mike Johnson resolved chat",
      description: "Customer: Jane Smith • 5 min ago",
      status: "completed",
      statusColor: "bg-gray-100 text-gray-600"
    },
    {
      icon: UserCheck,
      title: "Support Bot assigned to Lisa Wang",
      description: "• 8 min ago",
      status: "pending",
      statusColor: "bg-gray-100 text-gray-600"
    }
  ];

  // Mock data for team performance
  const teamPerformance = [
    {
      name: "Sarah Chen",
      initials: "SC",
      chats: "15 chats today",
      rating: "4.9",
      status: "online",
      statusColor: "bg-purple-100 text-purple-600"
    },
    {
      name: "Mike Johnson",
      initials: "MJ",
      chats: "12 chats today",
      rating: "4.8",
      status: "online",
      statusColor: "bg-purple-100 text-purple-600"
    },
    {
      name: "Lisa Wang",
      initials: "LW",
      chats: "8 chats today",
      rating: "4.7",
      status: "busy",
      statusColor: "bg-gray-100 text-gray-600"
    },
    {
      name: "David Kim",
      initials: "DK",
      chats: "6 chats today",
      rating: "4.6",
      status: "offline",
      statusColor: "bg-gray-100 text-gray-600"
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Top Row - Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-white rounded-2xl shadow-sm border-0 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center space-x-1">
                    {metric.changeType === "positive" && <ArrowUp className="w-3 h-3 text-green-600" />}
                    {metric.changeType === "negative" && <ArrowDown className="w-3 h-3 text-red-600" />}
                    <p className={`text-sm ${
                      metric.changeType === "positive" ? "text-green-600" : 
                      metric.changeType === "negative" ? "text-red-600" : 
                      "text-gray-600"
                    }`}>
                      {metric.change}
                    </p>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200`}>
                  <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Connected Users Section */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <LinkIcon className="w-6 h-6 text-gray-600" />
            <h2 className="text-2xl font-bold text-gray-900">Connected Users</h2>
          </div>
          <p className="text-gray-600">
            Users under your management who can access customer support agents
          </p>
        </div>

        {/* Connected Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {connectedMetrics.map((metric, index) => (
            <Card key={index} className={`${metric.bgColor} rounded-2xl shadow-sm border-0 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer`}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${metric.bgColor} hover:opacity-80 transition-opacity duration-200`}>
                    <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className={`text-2xl font-bold ${metric.textColor}`}>{metric.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User List */}
        <div className="space-y-4">
          {users.map((user, index) => (
            <Card key={index} className="bg-white rounded-2xl shadow-sm border-0 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                      <span className="text-sm font-medium text-gray-600">{user.initials}</span>
                    </div>
                    
                    {/* User Info */}
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <div className="flex items-center space-x-2">
                        {user.badges.map((badge, badgeIndex) => (
                          <Badge key={badgeIndex} className={`text-xs ${badge.color} hover:opacity-80 transition-opacity duration-200`}>
                            {badge.text}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    {/* Stats */}
                    <div className="text-right space-y-1">
                      <p className="text-sm text-gray-600">{user.bots}</p>
                      <p className="text-sm text-gray-500">{user.lastActive}</p>
                    </div>

                    {/* Action Button */}
                    <Button 
                      variant="outline" 
                      className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:scale-105 rounded-xl transition-all duration-200"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Section - Recent Activity and Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-white rounded-2xl shadow-sm border-0 hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="p-6 pb-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-gray-600" />
              <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
            </div>
            <p className="text-sm text-gray-600">Latest team activities and handoffs</p>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
                      <activity.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs ${activity.statusColor} hover:opacity-80 transition-opacity duration-200`}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="bg-white rounded-2xl shadow-sm border-0 hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="p-6 pb-4">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-gray-600" />
              <CardTitle className="text-xl font-bold text-gray-900">Team Performance</CardTitle>
            </div>
            <p className="text-sm text-gray-600">Current agent performance metrics</p>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              {teamPerformance.map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200">
                      <span className="text-sm font-medium text-gray-600">{agent.initials}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200">{agent.name}</p>
                      <p className="text-sm text-gray-600">{agent.chats}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 hover:text-yellow-600 transition-colors duration-200" />
                      <span className="text-sm font-medium text-gray-900">{agent.rating}</span>
                    </div>
                    <Badge className={`text-xs ${agent.statusColor} hover:opacity-80 transition-opacity duration-200`}>
                      {agent.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerOverview;
