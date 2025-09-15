'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Clock, User, Search, Filter, MoreHorizontal, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RoleGuard from '@/components/auth/RoleGuard';

interface ConversationSession {
  id: string;
  customerName: string;
  customerEmail: string;
  botName: string;
  startTime: string;
  endTime: string;
  status: string;
  messageCount: number;
  duration: string;
  satisfaction: number;
}

interface ConversationStats {
  total: number;
  active: number;
  completed: number;
  avgRating: number;
}

const ConversationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [conversations, setConversations] = useState<ConversationSession[]>([]);
  const [stats, setStats] = useState<ConversationStats>({
    total: 0,
    active: 0,
    completed: 0,
    avgRating: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch conversations from API
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/user/conversations');
        
        if (!response.ok) {
          throw new Error('Failed to fetch conversations');
        }
        
        const data = await response.json();
        setConversations(data.conversations || []);
        setStats(data.stats || { total: 0, active: 0, completed: 0, avgRating: 0 });
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleString();
  };

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversation.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversation.botName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || conversation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <RoleGuard allowedRoles={['user']}>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#6566F1] mx-auto mb-4" />
              <p className="text-gray-600 text-sm sm:text-base">Loading conversations...</p>
            </div>
          </div>
        </div>
      </RoleGuard>
    );
  }

  if (error) {
    return (
      <RoleGuard allowedRoles={['user']}>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Conversations</h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-[#6566F1] hover:bg-[#5A5BD8] text-white"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={['user']}>
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Conversations</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              View and manage all conversations from your assigned bots
            </p>
          </div>
        </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300 focus:border-[#6566F1] focus:ring-[#6566F1] bg-white rounded-2xl"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:border-[#6566F1] focus:ring-[#6566F1] bg-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[#6566F1]" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total Conversations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.active}</p>
                  <p className="text-sm text-gray-600">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-lg">★</span>
                <div>
                  <p className="text-2xl font-bold">{stats.avgRating}</p>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      {/* Conversations List */}
      <div className="space-y-4">
        {filteredConversations.length === 0 ? (
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversations found</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No conversations from your assigned bots have been recorded yet.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredConversations.map((conversation) => (
            <Card key={conversation.id} className="border border-gray-200 bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{conversation.customerName}</h3>
                      <Badge className={getStatusColor(conversation.status)}>
                        {conversation.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{conversation.customerEmail}</p>
                    <p className="text-sm text-gray-500 mb-2">Bot: {conversation.botName}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Started: {formatTime(conversation.startTime)}</span>
                      {conversation.endTime && (
                        <span>Ended: {formatTime(conversation.endTime)}</span>
                      )}
                      <span>{conversation.messageCount} messages</span>
                      {conversation.satisfaction && (
                        <span className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          {conversation.satisfaction}/5
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      </div>
    </RoleGuard>
  );
};

export default ConversationsPage;
