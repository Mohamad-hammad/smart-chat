'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  Bot,
  User,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DashboardLayoutWithAuth from '@/components/dashboard/DashboardLayoutWithAuth';
import { useRouter } from 'next/navigation';

// Mock Data
interface Conversation {
  id: string;
  timestamp: string;
  message: string;
  response: string;
  sessionId: string;
  ip: string;
}

interface AgentRequest {
  id: string;
  timestamp: string;
  description: string;
  status: 'Pending' | 'Resolved' | 'In Progress';
  estimatedWaitTime: string;
}

interface IssueReport {
  id: string;
  timestamp: string;
  issueType: string;
  description: string;
  email: string;
  status: 'Open' | 'Closed' | 'Investigating';
  priority: 'Low' | 'Medium' | 'High';
}

const conversations: Conversation[] = [
  { id: 'conv1', timestamp: '2023-10-26T10:00:00Z', message: 'Hi, I need help with my account.', response: 'Sure, I can help with that. What is your account number?', sessionId: 'sess123', ip: '192.168.1.1' },
  { id: 'conv2', timestamp: '2023-10-26T10:05:00Z', message: 'My bot is not responding.', response: 'Please provide more details about the issue.', sessionId: 'sess124', ip: '192.168.1.2' },
  { id: 'conv3', timestamp: '2023-10-26T10:10:00Z', message: 'How do I upgrade my plan?', response: 'You can upgrade your plan from the billing section of your dashboard.', sessionId: 'sess125', ip: '192.168.1.3' },
  { id: 'conv4', timestamp: '2023-10-26T10:15:00Z', message: 'I want to report a bug.', response: 'Please use the "Report Issue" feature in the chatbot.', sessionId: 'sess126', ip: '192.168.1.4' },
];

const agentRequests: AgentRequest[] = [
  { id: 'agent1', timestamp: '2023-10-26T10:20:00Z', description: 'User needs help with a complex billing issue.', status: 'Pending', estimatedWaitTime: '5 min' },
  { id: 'agent2', timestamp: '2023-10-26T10:25:00Z', description: 'User wants to discuss custom integration.', status: 'In Progress', estimatedWaitTime: '2 min' },
];

const issueReports: IssueReport[] = [
  { id: 'issue1', timestamp: '2023-10-26T10:30:00Z', issueType: 'Technical Problem', description: 'Chatbot sometimes gives irrelevant answers.', email: 'user1@example.com', status: 'Investigating', priority: 'Medium' },
  { id: 'issue2', timestamp: '2023-10-26T10:35:00Z', issueType: 'Bug Report', description: 'Chatbot crashes when asking about pricing.', email: 'user2@example.com', status: 'Open', priority: 'High' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
    case 'Open':
      return 'bg-yellow-100 text-yellow-800';
    case 'Resolved':
    case 'Closed':
      return 'bg-green-100 text-green-800';
    case 'In Progress':
    case 'Investigating':
      return 'bg-blue-100 text-blue-800';
    case 'High':
      return 'bg-red-100 text-red-800';
    case 'Medium':
      return 'bg-orange-100 text-orange-800';
    case 'Low':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ChatbotAnalyticsClient: React.FC = () => {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('7d');

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayoutWithAuth activeSection="chatbot-analytics">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chatbot Analytics</h1>
            <p className="text-gray-600">Monitor your chatbot's performance and user interactions.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-white rounded-2xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={() => handleNavigation('/dashboard/analytics')}
              className="bg-[#6566F1] hover:bg-[#5A5BD8] text-white rounded-2xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-[#6566F1]" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                  <p className="text-sm text-gray-700">Total Conversations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">934</p>
                  <p className="text-sm text-gray-700">Unique Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">2.3s</p>
                  <p className="text-sm text-gray-700">Avg. Response Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-gray-700">Open Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Conversations */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Recent Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600">Timestamp</TableHead>
                  <TableHead className="text-gray-600">User Message</TableHead>
                  <TableHead className="text-gray-600">Bot Response</TableHead>
                  <TableHead className="text-gray-600">Session ID</TableHead>
                  <TableHead className="text-gray-600">IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conversations.map((conversation) => (
                  <TableRow key={conversation.id}>
                    <TableCell className="text-sm text-gray-700">
                      {new Date(conversation.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-gray-900">
                      {conversation.message}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-gray-900">
                      {conversation.response}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {conversation.sessionId}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {conversation.ip}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Human Agent Requests */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Human Agent Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600">Timestamp</TableHead>
                  <TableHead className="text-gray-600">Description</TableHead>
                  <TableHead className="text-gray-600">Status</TableHead>
                  <TableHead className="text-gray-600">Est. Wait Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agentRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="text-sm text-gray-700">
                      {new Date(request.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-gray-900">{request.description}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {request.estimatedWaitTime}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Issue Reports */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Issue Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600">Timestamp</TableHead>
                  <TableHead className="text-gray-600">Issue Type</TableHead>
                  <TableHead className="text-gray-600">Description</TableHead>
                  <TableHead className="text-gray-600">Email</TableHead>
                  <TableHead className="text-gray-600">Status</TableHead>
                  <TableHead className="text-gray-600">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issueReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="text-sm text-gray-700">
                      {new Date(report.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-gray-900">{report.issueType}</TableCell>
                    <TableCell className="max-w-xs truncate text-gray-900">
                      {report.description}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {report.email}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(report.priority)}>
                        {report.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayoutWithAuth>
  );
};

export default ChatbotAnalyticsClient;
