'use client';

import React, { useState, useEffect } from 'react';
import { 
  PlayCircle, 
  Bot, 
  MessageSquare, 
  ArrowRight, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Users,
  Zap,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import RoleGuard from '@/components/auth/RoleGuard';
import { useRouter } from 'next/navigation';

interface AssignedBot {
  id: string;
  name: string;
  description: string;
  domain: string;
  status: string;
  conversations: number;
  lastActive: string;
  assignedAt: string;
}

const PlaygroundPage = () => {
  const router = useRouter();
  const [bots, setBots] = useState<AssignedBot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignedBots = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/user/assigned-bots');
        if (response.ok) {
          const data = await response.json();
          setBots(data.bots || []);
        } else {
          setError('Failed to fetch assigned bots');
        }
      } catch (error) {
        console.error('Error fetching assigned bots:', error);
        setError('Error loading bots');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedBots();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'paused': return <Clock className="w-4 h-4" />;
      case 'inactive': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleTestBot = (botId: string) => {
    router.push(`/user-dashboard/test-bot?botId=${botId}`);
  };

  if (loading) {
    return (
      <RoleGuard allowedRoles={['user']}>
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={['user']}>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <PlayCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Playground</h1>
            <p className="text-gray-600">Test and experiment with your assigned bots</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Bots</p>
                  <p className="text-2xl font-bold text-gray-900">{bots.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Bots</p>
                  <p className="text-2xl font-bold text-green-600">
                    {bots.filter(bot => bot.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Conversations</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {bots.reduce((sum, bot) => sum + bot.conversations, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ready to Test</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {bots.filter(bot => bot.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Section */}
        <Card className="border border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome to the Playground!</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This is your testing environment where you can interact with your assigned bots, 
                  test different scenarios, and see how they respond to various queries. 
                  Perfect for experimenting and understanding bot capabilities.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Real-time Chat
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    <Bot className="w-3 h-3 mr-1" />
                    Multiple Bots
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Zap className="w-3 h-3 mr-1" />
                    Instant Testing
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bots Grid */}
        {error ? (
          <Card className="border border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Bots</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : bots.length === 0 ? (
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-8 text-center">
              <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bots Assigned</h3>
              <p className="text-gray-600 mb-4">
                You don't have any bots assigned to you yet. Contact your manager to get access to bots for testing.
              </p>
              <Button 
                onClick={() => router.push('/user-dashboard/bots')}
                className="bg-[#6566F1] hover:bg-[#5A5BD8] text-white"
              >
                View My Bots
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bots.map((bot) => (
              <Card key={bot.id} className="border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#6566F1] to-[#7B68EE] rounded-xl flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{bot.name}</h3>
                        <p className="text-sm text-gray-600">{bot.domain}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(bot.status)} font-medium px-3 py-1`}>
                      {getStatusIcon(bot.status)}
                      <span className="ml-1">{bot.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed">{bot.description}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <MessageSquare className="w-4 h-4 text-[#6566F1]" />
                        <span className="text-xs font-medium text-gray-600">Conversations</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{bot.conversations}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-[#6566F1]" />
                        <span className="text-xs font-medium text-gray-600">Last Active</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{bot.lastActive}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    onClick={() => handleTestBot(bot.id)}
                    disabled={bot.status !== 'active'}
                    className="w-full bg-gradient-to-r from-[#6566F1] to-[#7B68EE] hover:from-[#5A5BD8] hover:to-[#6A5ACD] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {bot.status === 'active' ? 'Test Bot' : 'Bot Inactive'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Tips */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Quick Tips for Testing</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Test Different Scenarios</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Ask questions related to the bot's domain</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Test edge cases and unusual requests</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Try different conversation flows</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">What to Look For</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Response accuracy and relevance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Response time and consistency</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Handling of unclear or complex queries</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
};

export default PlaygroundPage;
