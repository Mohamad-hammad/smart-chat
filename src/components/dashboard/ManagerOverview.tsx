'use client';
import React, { useState, useEffect } from 'react';
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
  UserCheck,
  Loader2
} from 'lucide-react';

const ManagerOverview = () => {
  const [overviewData, setOverviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch overview data from API
  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/manager/overview');
        
        if (!response.ok) {
          throw new Error('Failed to fetch overview data');
        }
        
        const data = await response.json();
        setOverviewData(data);
      } catch (err) {
        console.error('Error fetching overview data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch overview data');
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#6566F1] mx-auto mb-4" />
            <p className="text-gray-600">Loading overview data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !overviewData) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Overview</h3>
            <p className="text-gray-600 mb-4">{error || 'Failed to load overview data'}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-[#6566F1] hover:bg-[#5A5BD8] text-white"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Use real data for metrics
  const metrics = [
    {
      title: "Total Users",
      value: overviewData.metrics.totalUsers.toString(),
      change: `${overviewData.stats.acceptedUsers} active`,
      changeType: "positive",
      icon: Users,
      iconColor: "text-gray-600"
    },
    {
      title: "Active Chats",
      value: overviewData.metrics.activeChats.toString(),
      change: overviewData.stats.chatChange > 0 ? `+${overviewData.stats.chatChange}% from yesterday` : `${overviewData.stats.chatChange}% from yesterday`,
      changeType: overviewData.stats.chatChange > 0 ? "positive" : "negative",
      icon: MessageSquare,
      iconColor: "text-gray-600"
    },
    {
      title: "Pending Users",
      value: overviewData.metrics.pendingHandoffs.toString(),
      change: "Awaiting acceptance",
      changeType: "warning",
      icon: Clock,
      iconColor: "text-gray-600"
    },
    {
      title: "Resolved Today",
      value: overviewData.metrics.resolvedToday.toString(),
      change: "Recent conversations",
      changeType: "positive",
      icon: CheckCircle,
      iconColor: "text-gray-600"
    }
  ];

  // Use real data for connected users metrics
  const connectedMetrics = [
    {
      title: "Total Users",
      value: overviewData.connectedMetrics.totalUsers.toString(),
      icon: Users,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      textColor: "text-blue-600"
    },
    {
      title: "Total Bots",
      value: overviewData.connectedMetrics.totalBots.toString(),
      icon: Bot,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      textColor: "text-green-600"
    },
    {
      title: "Online Users",
      value: overviewData.connectedMetrics.availableAgents.toString(),
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          // Define colors for each metric - avoid repetition in similar groups
          const getMetricColors = (title: string, index: number) => {
            if (title.includes('Total Users')) {
              return {
                bg: 'bg-purple-50',
                iconBg: 'bg-purple-500',
                textColor: 'text-purple-600'
              };
            } else if (title.includes('Active Chats') || title.includes('Chats') || title.includes('Conversations')) {
              return {
                bg: 'bg-green-50',
                iconBg: 'bg-green-500',
                textColor: 'text-green-600'
              };
            } else if (title.includes('Pending Users')) {
              return {
                bg: 'bg-blue-50',
                iconBg: 'bg-blue-500',
                textColor: 'text-blue-600'
              };
            } else if (title.includes('Resolved') || title.includes('Today')) {
              return {
                bg: 'bg-gray-50',
                iconBg: 'bg-gray-500',
                textColor: 'text-gray-600'
              };
            } else if (title.includes('Total Bots') || title.includes('Bots')) {
              return {
                bg: 'bg-purple-50',
                iconBg: 'bg-purple-500',
                textColor: 'text-purple-600'
              };
            } else {
              return {
                bg: 'bg-indigo-50',
                iconBg: 'bg-indigo-500',
                textColor: 'text-indigo-600'
              };
            }
          };

          const colors = getMetricColors(metric.title, index);

          return (
            <Card key={index} className={`${colors.bg} border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-900 truncate">{metric.title}</p>
                    <p className={`text-xl font-bold ${colors.textColor}`}>{metric.value}</p>
                    {metric.change && (
                      <div className="flex items-center space-x-1 mt-1">
                        {metric.changeType === "positive" && <ArrowUp className="w-2 h-2 text-green-600" />}
                        {metric.changeType === "negative" && <ArrowDown className="w-2 h-2 text-red-600" />}
                        <p className={`text-xs ${
                          metric.changeType === "positive" ? "text-green-600" : 
                          metric.changeType === "negative" ? "text-red-600" : 
                          "text-gray-600"
                        }`}>
                          {metric.change}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
          {connectedMetrics.map((metric, index) => {
            // Define colors for connected metrics - avoid repetition with top row
            const getConnectedMetricColors = (title: string, index: number) => {
              if (title.includes('Total Users')) {
                return {
                  bg: 'bg-blue-50',
                  iconBg: 'bg-blue-500',
                  textColor: 'text-blue-600'
                };
              } else if (title.includes('Total Bots') || title.includes('Bots')) {
                return {
                  bg: 'bg-purple-50',
                  iconBg: 'bg-purple-500',
                  textColor: 'text-purple-600'
                };
              } else if (title.includes('Online Users') || title.includes('Online')) {
                return {
                  bg: 'bg-emerald-50',
                  iconBg: 'bg-emerald-500',
                  textColor: 'text-emerald-600'
                };
              } else {
                return {
                  bg: 'bg-cyan-50',
                  iconBg: 'bg-cyan-500',
                  textColor: 'text-cyan-600'
                };
              }
            };

            const colors = getConnectedMetricColors(metric.title, index);

            return (
              <Card key={index} className={`${colors.bg} border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center shadow-sm flex-shrink-0`}>
                      <metric.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-900 truncate">{metric.title}</p>
                      <p className={`text-xl font-bold ${colors.textColor}`}>{metric.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* User List */}
        <div className="space-y-3">
          {users.map((user, index) => (
            <Card key={index} className="group relative border border-gray-200 bg-white hover:shadow-md hover:shadow-gray-200/50 transition-all duration-200 rounded-xl overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 flex-shrink-0">
                      <span className="text-xs font-medium text-gray-600">{user.initials}</span>
                    </div>
                    
                    {/* User Info */}
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200">{user.name}</h3>
                      <p className="text-xs text-gray-600">{user.email}</p>
                      <div className="flex items-center space-x-1.5">
                        {user.badges.map((badge, badgeIndex) => (
                          <Badge key={badgeIndex} className={`text-xs px-2 py-0.5 ${badge.color} hover:opacity-80 transition-opacity duration-200`}>
                            {badge.text}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Stats */}
                    <div className="text-right space-y-0.5">
                      <p className="text-xs text-gray-600">{user.bots}</p>
                      <p className="text-xs text-gray-500">{user.lastActive}</p>
                    </div>

                    {/* Action Button */}
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:scale-105 rounded-lg transition-all duration-200 text-xs px-3 py-1.5"
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
