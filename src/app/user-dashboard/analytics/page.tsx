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

// Mock analytics data matching the image exactly
const conversationData = [
  { date: "Jan 01", conversations: 40, messages: 210 },
  { date: "Jan 02", conversations: 45, messages: 280 },
  { date: "Jan 03", conversations: 40, messages: 230 },
  { date: "Jan 04", conversations: 55, messages: 320 },
  { date: "Jan 05", conversations: 50, messages: 280 },
  { date: "Jan 06", conversations: 67, messages: 378 },
  { date: "Jan 07", conversations: 45, messages: 300 },
];

const satisfactionData = [
  { rating: "5 Stars", count: 45, percentage: 35 },
  { rating: "4 Stars", count: 38, percentage: 30 },
  { rating: "3 Stars", count: 25, percentage: 20 },
  { rating: "2 Stars", count: 12, percentage: 10 },
  { rating: "1 Star", count: 5, percentage: 5 },
];

const languageData = [
  { name: "English", value: 68, color: "#6566F1" },
  { name: "Spanish", value: 18, color: "#8b5cf6" },
  { name: "French", value: 8, color: "#0891b2" },
  { name: "German", value: 4, color: "#f59e0b" },
  { name: "Other", value: 2, color: "#fbbf24" },
];

const topQuestions = [
  { question: "What are your business hours?", count: 145 },
  { question: "How do I return a product?", count: 132 },
  { question: "What payment methods do you accept?", count: 98 },
  { question: "How can I track my order?", count: 87 },
  { question: "Do you offer international shipping?", count: 76 },
];

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <DashboardLayoutWithAuth activeSection="analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">
              Track your bot&apos;s performance and insights
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 border-gray-300 focus:border-[#6566F1] focus:ring-[#6566F1] bg-white rounded-2xl">
                <SelectValue className="text-gray-700" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h" className="text-gray-700">Last 24h</SelectItem>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border border-gray-200 bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[#6566F1]" />
                <div>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-gray-600">Total Conversations</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">+15.3%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">934</p>
                  <p className="text-sm text-gray-600">Unique Visitors</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">+8.7%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">2.3s</p>
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-red-500 mr-1 rotate-180" />
                    <span className="text-xs text-red-500">+0.2s</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-lg">★</span>
                <div>
                  <p className="text-2xl font-bold">4.6</p>
                  <p className="text-sm text-gray-600">Satisfaction Score</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">+0.3</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversations Over Time */}
          <Card className="border border-gray-200 bg-white rounded-2xl">
            <CardHeader>
              <CardTitle>Conversations Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={conversationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
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
                    name="Conversations"
                    dot={{ fill: 'white', stroke: '#c084fc', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#c084fc', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="Messages"
                    dot={{ fill: 'white', stroke: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Satisfaction Ratings */}
          <Card className="border border-gray-200 bg-white rounded-2xl">
            <CardHeader>
              <CardTitle>Customer Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="rating" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
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
        <Card className="border border-gray-200 bg-white rounded-2xl">
          <CardHeader>
            <CardTitle>Language Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="60%" height={300}>
                <PieChart>
                  <Pie
                    data={languageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
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
              <div className="space-y-3">
                {languageData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    <span className="text-sm text-gray-600">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Questions */}
        <Card className="border border-gray-200 bg-white rounded-2xl">
          <CardHeader>
            <CardTitle>Most Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topQuestions.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-700">{item.question}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Stats */}
        <Card className="border border-gray-200 bg-white rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Real-time Activity</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MessageCircle className="w-6 h-6 text-green-600 mr-2" />
                  <p className="text-3xl font-bold text-green-600">12</p>
                </div>
                <p className="text-sm text-gray-600">Active Conversations</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="w-6 h-6 text-blue-600 mr-2" />
                  <p className="text-3xl font-bold text-blue-600">47</p>
                </div>
                <p className="text-sm text-gray-600">Visitors Online</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-[#6566F1] mr-2" />
                  <p className="text-3xl font-bold text-[#6566F1]">1.8s</p>
                </div>
                <p className="text-sm text-gray-600">Current Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayoutWithAuth>
  );
};

export default AnalyticsPage;
