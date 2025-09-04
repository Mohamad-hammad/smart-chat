'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  MoreHorizontal,
  Bot,
  Edit,
  PlayCircle,
  Settings,
  Trash2,
  Users,
  MessageSquare,
  ArrowLeft,
  UserPlus,
  UserMinus,
  Mail,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data
const mockBots = [
  {
    id: "1",
    name: "Customer Support Bot",
    description: "Handles customer inquiries and support tickets with AI-powered responses",
    domain: "support.company.com",
    status: "active",
    conversations: 342,
    totalUsers: 5,
    knowledgeBase: 23,
    lastActive: "2 min ago",
    assignedUsers: ["john@company.com", "sarah@company.com"],
    createdAt: "2024-01-15",
    lastConversation: "2024-01-20"
  },
  {
    id: "2",
    name: "Sales Assistant",
    description: "Helps with product information and sales inquiries",
    domain: "sales.company.com",
    status: "active",
    conversations: 189,
    totalUsers: 3,
    knowledgeBase: 15,
    lastActive: "1 hour ago",
    assignedUsers: ["mike@company.com"],
    createdAt: "2024-01-10",
    lastConversation: "2024-01-19"
  },
  {
    id: "3",
    name: "FAQ Helper",
    description: "Answers frequently asked questions about products and services",
    domain: "help.company.com",
    status: "paused",
    conversations: 87,
    totalUsers: 2,
    knowledgeBase: 8,
    lastActive: "3 days ago",
    assignedUsers: ["alice@company.com", "bob@company.com"],
    createdAt: "2024-01-05",
    lastConversation: "2024-01-18"
  }
];

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@company.com", role: "user", status: "online" },
  { id: "2", name: "Sarah Smith", email: "sarah@company.com", role: "user", status: "away" },
  { id: "3", name: "Mike Johnson", email: "mike@company.com", role: "user", status: "online" },
  { id: "4", name: "Alice Brown", email: "alice@company.com", role: "user", status: "offline" },
  { id: "5", name: "Bob Wilson", email: "bob@company.com", role: "user", status: "online" }
];

const mockConversations = [
  {
    id: "1",
    botId: "1",
    customerName: "Jane Customer",
    customerEmail: "jane@example.com",
    startTime: "2024-01-20T10:30:00Z",
    endTime: "2024-01-20T10:45:00Z",
    status: "resolved",
    messages: [
      { id: "1", content: "Hi, I need help with my order", sender: "customer", timestamp: "2024-01-20T10:30:00Z" },
      { id: "2", content: "I'd be happy to help you with your order. Can you provide your order number?", sender: "bot", timestamp: "2024-01-20T10:31:00Z" },
      { id: "3", content: "My order number is #12345", sender: "customer", timestamp: "2024-01-20T10:32:00Z" }
    ]
  }
];

export default function BotsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedBot, setSelectedBot] = useState<{
    id: string;
    name: string;
    assignedUsers: string[];
  } | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showConversationHistory, setShowConversationHistory] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newBot, setNewBot] = useState({
    name: "",
    description: "",
    domain: "",
    status: "active"
  });
  const [inviteData, setInviteData] = useState({
    email: "",
    name: "",
    role: "user"
  });
  const [bots, setBots] = useState(mockBots);
  const [loading, setLoading] = useState(true);

  // Fetch bots from API
  useEffect(() => {
    const fetchBots = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/manager/bots');
        if (response.ok) {
          const data = await response.json();
          setBots(data.bots || []);
        } else {
          console.error('Failed to fetch bots');
          // Keep using mock data as fallback
        }
      } catch (error) {
        console.error('Error fetching bots:', error);
        // Keep using mock data as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchBots();
  }, []);

  const filteredBots = bots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bot.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || bot.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    const color = status === 'online' ? 'bg-green-500' : status === 'away' ? 'bg-yellow-500' : 'bg-gray-400';
    return <div className={`w-2 h-2 rounded-full ${color}`}></div>;
  };

  const handleCreateBot = async () => {
    try {
      const response = await fetch('/api/manager/create-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBot),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Bot created successfully:', result);
        // Refresh the bots list
        const refreshResponse = await fetch('/api/manager/bots');
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          setBots(refreshData.bots || []);
        }
      } else {
        const error = await response.json();
        console.error('Failed to create bot:', error);
        alert('Failed to create bot: ' + (error.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating bot:', error);
      alert('Error creating bot. Please try again.');
    }
    
    setNewBot({ name: "", description: "", domain: "", status: "active" });
    setShowCreateModal(false);
  };

  const handleAssignUser = (botId: string, userEmail: string) => {
    console.log(`Assigning user ${userEmail} to bot ${botId}`);
  };

  const handleUnassignUser = (botId: string, userEmail: string) => {
    console.log(`Unassigning user ${userEmail} from bot ${botId}`);
  };

  const handleViewConversations = (bot: { id: string; name: string; assignedUsers: string[]; }) => {
    setSelectedBot(bot);
    setShowConversationHistory(true);
  };

  const getBotConversations = (botId: string) => {
    return mockConversations.filter(conv => conv.botId === botId);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleStatusToggle = (botId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    console.log(`Toggling bot ${botId} status from ${currentStatus} to ${newStatus}`);
  };

  const handleInviteUser = async () => {
    try {
      const response = await fetch('/api/admin/invite-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inviteData),
      });

      if (response.ok) {
        alert('Invitation sent successfully!');
        setInviteData({ email: '', name: '', role: 'user' });
        setShowInviteModal(false);
      } else {
        alert('Failed to send invitation. Please try again.');
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
      alert('Error sending invitation. Please try again.');
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6566F1] to-[#5A5BD9] rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bot Management</h1>
              <p className="text-sm text-gray-600 mt-1">Create, manage, and assign users to your AI chatbots</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="border-[#6566F1] text-[#6566F1] hover:bg-[#6566F1] hover:text-white rounded-2xl"
            onClick={() => setShowInviteModal(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite User
          </Button>
          
          <Button 
            className="bg-[#6566F1] hover:bg-[#5A5BD9] text-white rounded-2xl"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Bot
          </Button>
        </div>
      </div>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Invite New User</h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">Send an invitation to a new user to join your team</p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="invite-name">Full Name</Label>
                <Input
                  id="invite-name"
                  placeholder="Enter full name"
                  value={inviteData.name}
                  onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="invite-email">Email Address</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="Enter email address"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="invite-role">Role</Label>
                <select
                  id="invite-role"
                  value={inviteData.role}
                  onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#6566F1] focus:ring-[#6566F1]"
                >
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowInviteModal(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleInviteUser}
                className="bg-[#6566F1] hover:bg-[#5A5BD9] text-white rounded-xl"
                disabled={!inviteData.name || !inviteData.email}
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Bot Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Bot</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="bot-name" className="text-sm font-semibold text-gray-700 block mb-2">
                  Bot Name *
                </Label>
                <Input
                  id="bot-name"
                  value={newBot.name}
                  onChange={(e) => setNewBot({...newBot, name: e.target.value})}
                  placeholder="Enter bot name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#6566F1] focus:ring-2 focus:ring-[#6566F1]/20 text-gray-900 placeholder-gray-500"
                />
              </div>
              
              <div>
                <Label htmlFor="bot-description" className="text-sm font-semibold text-gray-700 block mb-2">
                  Description *
                </Label>
                <textarea
                  id="bot-description"
                  value={newBot.description}
                  onChange={(e) => setNewBot({...newBot, description: e.target.value})}
                  placeholder="Describe what this bot does and how it helps users"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#6566F1] focus:ring-2 focus:ring-[#6566F1]/20 text-gray-900 placeholder-gray-500 resize-none"
                />
              </div>
              
              <div>
                <Label htmlFor="bot-domain" className="text-sm font-semibold text-gray-700 block mb-2">
                  Domain *
                </Label>
                <Input
                  id="bot-domain"
                  value={newBot.domain}
                  onChange={(e) => setNewBot({...newBot, domain: e.target.value})}
                  placeholder="e.g., support.yoursite.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#6566F1] focus:ring-2 focus:ring-[#6566F1]/20 text-gray-900 placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">This will be the domain where your bot will be deployed</p>
              </div>
              
              <div>
                <Label htmlFor="bot-status" className="text-sm font-semibold text-gray-700 block mb-2">
                  Initial Status
                </Label>
                <select
                  id="bot-status"
                  value={newBot.status}
                  onChange={(e) => setNewBot({...newBot, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#6566F1] focus:ring-2 focus:ring-[#6566F1]/20 text-gray-900 bg-white"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateBot}
                disabled={!newBot.name || !newBot.description || !newBot.domain}
                className="px-6 py-2 bg-[#6566F1] hover:bg-[#5A5BD9] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Bot
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search bots by name or domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-[#6566F1] focus:ring-[#6566F1] rounded-xl h-11"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:border-[#6566F1] focus:ring-[#6566F1] bg-white h-11"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Bots</p>
                <p className="text-lg font-bold text-blue-700">{filteredBots.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Conversations</p>
                <p className="text-lg font-bold text-green-700">{filteredBots.reduce((sum, bot) => sum + bot.conversations, 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Assigned Users</p>
                <p className="text-lg font-bold text-purple-700">{filteredBots.reduce((sum, bot) => sum + bot.totalUsers, 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="border border-gray-200 bg-white rounded-2xl overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredBots.length === 0 ? (
          // Empty state
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bots found</h3>
            <p className="text-gray-500 text-center mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'No bots match your current filters. Try adjusting your search or filters.'
                : 'You haven\'t created any bots yet. Create your first bot to get started.'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-[#6566F1] hover:bg-[#5A5BD9] text-white rounded-xl px-6 py-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Bot
              </Button>
            )}
          </div>
        ) : (
          filteredBots.map((bot) => (
          <Card key={bot.id} className="group relative border border-gray-200 bg-white hover:shadow-xl hover:shadow-[#6566F1]/10 transition-all duration-300 rounded-2xl overflow-hidden hover:-translate-y-1">
            {/* Gradient Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6566F1]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Status Indicator */}
            <div className="absolute top-4 right-4 z-10">
              <div className={`w-3 h-3 rounded-full ${
                bot.status === 'active' ? 'bg-green-500 animate-pulse' : 
                bot.status === 'paused' ? 'bg-yellow-500' : 'bg-gray-400'
              }`}></div>
            </div>

            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6566F1] to-[#5A5BD9] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-[#6566F1]/25 transition-shadow duration-300">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg font-semibold truncate group-hover:text-[#6566F1] transition-colors duration-200">{bot.name}</CardTitle>
                    <p className="text-sm text-gray-500 truncate">{bot.domain}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#6566F1]/10 hover:text-[#6566F1] transition-colors duration-200">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem onClick={() => handleViewConversations(bot)}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      View Conversations
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowAssignModal(true)}>
                      <Users className="w-4 h-4 mr-2" />
                      Manage Users
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Bot
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Test Bot
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Bot
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              {/* Status and Last Active */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={`${getStatusColor(bot.status)} font-medium px-3 py-1`}>
                    {bot.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleStatusToggle(bot.id, bot.status)}
                    className={`h-6 w-6 p-0 hover:bg-opacity-20 ${
                      bot.status === 'active' 
                        ? 'hover:bg-yellow-500 text-yellow-600' 
                        : 'hover:bg-green-500 text-green-600'
                    }`}
                    title={bot.status === 'active' ? 'Pause Bot' : 'Activate Bot'}
                  >
                    {bot.status === 'active' ? (
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    ) : (
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                  </Button>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{bot.lastActive}</span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg group-hover:from-blue-100 group-hover:to-blue-200 transition-colors duration-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Conversations</p>
                      <p className="text-lg font-bold text-blue-700">{bot.conversations}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg group-hover:from-green-100 group-hover:to-green-200 transition-colors duration-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Assigned</p>
                      <p className="text-lg font-bold text-green-700">{bot.totalUsers}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-2">
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{bot.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-gray-300 hover:bg-[#6566F1]/10 hover:border-[#6566F1] hover:text-[#6566F1] text-gray-700 rounded-xl transition-all duration-200 group/btn"
                  onClick={() => handleViewConversations(bot)}
                >
                  <MessageSquare className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
                  Conversations
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-to-r from-[#6566F1] to-[#5A5BD9] hover:from-[#5A5BD9] hover:to-[#4A4BC8] text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-[#6566F1]/25 group/btn"
                  onClick={() => setShowAssignModal(true)}
                >
                  <Users className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
                  Manage Users
                </Button>
              </div>

              {/* Quick Stats Bar */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Created: {new Date(bot.createdAt).toLocaleDateString()}</span>
                  <span>Last: {new Date(bot.lastConversation).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
        )}
      </div>

      {/* User Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Manage Bot Users</h2>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Assigned Users */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Assigned Users</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {mockUsers.filter(user => selectedBot?.assignedUsers?.includes(user.email) || false).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(user.status)}
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUnassignUser(selectedBot?.id || '', user.email)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <UserMinus className="w-3 h-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Users */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Available Users</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {mockUsers.filter(user => !selectedBot?.assignedUsers?.includes(user.email) || true).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(user.status)}
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAssignUser(selectedBot?.id || '', user.email)}
                          className="bg-[#6566F1] hover:bg-[#5A5BD9] text-white"
                        >
                          <UserPlus className="w-3 h-3 mr-1" />
                          Assign
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setShowAssignModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Conversation History Modal */}
      {showConversationHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Conversation History - {selectedBot?.name}</span>
              </h2>
              <button
                onClick={() => setShowConversationHistory(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {getBotConversations(selectedBot?.id || '').map((conversation) => (
                <Card key={conversation.id} className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{conversation.customerName}</h4>
                        <p className="text-sm text-gray-500">{conversation.customerEmail}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={conversation.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {conversation.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTime(conversation.startTime)} - {formatTime(conversation.endTime)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {conversation.messages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'customer' 
                            ? 'bg-[#6566F1] text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'customer' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setShowConversationHistory(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
