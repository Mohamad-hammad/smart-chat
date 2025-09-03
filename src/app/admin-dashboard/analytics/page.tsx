'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
  Download,
  Calendar,
  Globe,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import DashboardLayoutWithAuth from '@/components/dashboard/DashboardLayoutWithAuth';
import RoleGuard from '@/components/auth/RoleGuard';

// Mock analytics data matching the image exactly
const conversationData = [
  { date: "Jan 01", conversations: 40, messages: 210 },
  { date: "Jan 02", conversations: 45, messages: 280 },
  { date: "Jan 03", conversations: 52, messages: 320 },
  { date: "Jan 04", conversations: 38, messages: 190 },
  { date: "Jan 05", conversations: 65, messages: 410 },
  { date: "Jan 06", conversations: 48, messages: 290 },
  { date: "Jan 07", conversations: 55, messages: 350 }
];

const satisfactionData = [
  { rating: "5 Stars", count: 45, percentage: 60 },
  { rating: "4 Stars", count: 20, percentage: 27 },
  { rating: "3 Stars", count: 7, percentage: 9 },
  { rating: "2 Stars", count: 2, percentage: 3 },
  { rating: "1 Star", count: 1, percentage: 1 }
];

const languageData = [
  { name: "English", value: 65, color: "#8b5cf6" },
  { name: "Spanish", value: 20, color: "#a855f7" },
  { name: "French", value: 10, color: "#c084fc" },
  { name: "German", value: 5, color: "#d8b4fe" }
];

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <RoleGuard allowedRoles={['admin']}>
      <DashboardLayoutWithAuth activeSection="analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Monitor your chatbot performance and user interactions</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-white rounded-2xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d" className="text-gray-700">Last 7 days</SelectItem>
                <SelectItem value="30d" className="text-gray-700">Last 30 days</SelectItem>
                <SelectItem value="90d" className="text-gray-700">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#6566F1] hover:bg-[#5A5BD8] text-white rounded-2xl">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Conversations</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                  <p className="text-sm text-green-600">+12% from last week</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-[#6566F1]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Messages Sent</p>
                  <p className="text-2xl font-bold text-gray-900">8,456</p>
                  <p className="text-sm text-green-600">+8% from last week</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">567</p>
                  <p className="text-sm text-green-600">+15% from last week</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">1.2s</p>
                  <p className="text-sm text-green-600">-0.3s from last week</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversations Over Time */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-gray-900">Conversations Over Time</CardTitle>
              <CardDescription>Daily conversation and message trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={conversationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="conversations" 
                    stroke="#c084fc" 
                    strokeWidth={2}
                    dot={{ fill: '#c084fc', strokeWidth: 2, r: 4 }}
                    name="Conversations"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    name="Messages"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Customer Satisfaction */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-gray-900">Customer Satisfaction</CardTitle>
              <CardDescription>User satisfaction ratings distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="rating" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#6566F1" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Language Distribution */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-gray-900">Language Distribution</CardTitle>
            <CardDescription>User language preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-80 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {languageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {languageData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Questions */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-gray-900">Most Asked Questions</CardTitle>
            <CardDescription>Frequently asked questions by users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "How do I reset my password?",
                "What are your business hours?",
                "How can I contact customer support?",
                "What payment methods do you accept?",
                "How do I cancel my subscription?"
              ].map((question, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 flex-1">{question}</p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {Math.floor(Math.random() * 50) + 10} times
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Stats */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-gray-900">Real-time Stats</CardTitle>
            <CardDescription>Live performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Clock className="w-8 h-8 text-[#6566F1] mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">2.3s</p>
                <p className="text-sm text-gray-600">Avg Response Time</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">94%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">23</p>
                <p className="text-sm text-gray-600">Active Now</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </DashboardLayoutWithAuth>
    </RoleGuard>
  );
};

export default AnalyticsPage;
