'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Bot, 
  MessageSquare, 
  Activity,
  Calendar,
  Filter,
  Download,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  totalBots: number;
  totalConversations: number;
  activeUsers: number;
  userGrowth: number;
  botGrowth: number;
  conversationGrowth: number;
  activeUserGrowth: number;
}

const AnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalUsers: 0,
    totalBots: 0,
    totalConversations: 0,
    activeUsers: 0,
    userGrowth: 0,
    botGrowth: 0,
    conversationGrowth: 0,
    activeUserGrowth: 0
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setAnalyticsData({
          totalUsers: 1247,
          totalBots: 89,
          totalConversations: 15678,
          activeUsers: 892,
          userGrowth: 12.5,
          botGrowth: 8.3,
          conversationGrowth: 15.7,
          activeUserGrowth: 5.2
        });
      } catch {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <ArrowUp className="w-4 h-4 text-green-600" />;
    if (growth < 0) return <ArrowDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const metrics = [
    {
      title: 'Total Users',
      value: analyticsData.totalUsers.toLocaleString(),
      growth: analyticsData.userGrowth,
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Total Bots',
      value: analyticsData.totalBots.toLocaleString(),
      growth: analyticsData.botGrowth,
      icon: Bot,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Conversations',
      value: analyticsData.totalConversations.toLocaleString(),
      growth: analyticsData.conversationGrowth,
      icon: MessageSquare,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Active Users',
      value: analyticsData.activeUsers.toLocaleString(),
      growth: analyticsData.activeUserGrowth,
      icon: Activity,
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  const chartData = [
    { month: 'Jan', users: 1200, bots: 80, conversations: 12000 },
    { month: 'Feb', users: 1250, bots: 85, conversations: 13500 },
    { month: 'Mar', users: 1300, bots: 88, conversations: 14500 },
    { month: 'Apr', users: 1247, bots: 89, conversations: 15678 }
  ];

  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border-0">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into platform usage and performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6566F1] focus:border-transparent bg-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border-0 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-sm flex items-center mt-1 ${getGrowthColor(metric.growth)}`}>
                    {getGrowthIcon(metric.growth)}
                    <span className="ml-1">{Math.abs(metric.growth)}% from last period</span>
                  </p>
                </div>
                <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-[#6566F1]" />
              User Growth
            </h3>
            <button className="text-gray-500 hover:text-gray-700">
              <Eye className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {chartData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{data.month}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">{data.users.toLocaleString()}</span>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(data.users / 1500) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bot Performance Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Bot className="w-6 h-6 mr-2 text-[#6566F1]" />
              Bot Performance
            </h3>
            <button className="text-gray-500 hover:text-gray-700">
              <Eye className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {chartData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{data.month}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">{data.bots}</span>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(data.bots / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Bots */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-0">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-[#6566F1]" />
            Top Performing Bots
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Customer Support Bot', conversations: 2456, growth: 12.5 },
              { name: 'Sales Assistant', conversations: 1890, growth: 8.3 },
              { name: 'Technical Help', conversations: 1567, growth: 15.7 },
              { name: 'FAQ Bot', conversations: 1234, growth: 5.2 }
            ].map((bot, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-900">{bot.name}</p>
                  <p className="text-sm text-gray-600">{bot.conversations.toLocaleString()} conversations</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold flex items-center ${getGrowthColor(bot.growth)}`}>
                    {getGrowthIcon(bot.growth)}
                    <span className="ml-1">{bot.growth}%</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-0">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-[#6566F1]" />
            User Activity
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Daily Active Users', value: 892, percentage: 85 },
              { label: 'Weekly Active Users', value: 1156, percentage: 92 },
              { label: 'Monthly Active Users', value: 1247, percentage: 100 },
              { label: 'New Registrations', value: 45, percentage: 12 }
            ].map((activity, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{activity.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{activity.value.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#6566F1] h-2 rounded-full" 
                    style={{ width: `${activity.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-0">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-[#6566F1]" />
            System Health
          </h3>
          <div className="space-y-4">
            {[
              { label: 'API Response Time', value: '120ms', status: 'good' },
              { label: 'Database Performance', value: '98.5%', status: 'excellent' },
              { label: 'Server Uptime', value: '99.9%', status: 'excellent' },
              { label: 'Error Rate', value: '0.1%', status: 'good' }
            ].map((health, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-600">{health.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900">{health.value}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    health.status === 'excellent' ? 'bg-green-500' : 
                    health.status === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
