'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
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
// Removed Radix UI dropdown imports - using custom implementation

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
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedBot, setSelectedBot] = useState<{
    id: string;
    name: string;
    assignedUsers: string[];
  } | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showConversationHistory, setShowConversationHistory] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newBot, setNewBot] = useState({
    name: "",
    description: "",
    domain: "",
    status: "active"
  });
  const [editBot, setEditBot] = useState({
    id: "",
    name: "",
    description: "",
    domain: "",
    status: "active"
  });
  const [inviteData, setInviteData] = useState({
    email: "",
    name: ""
  });
  const [emailError, setEmailError] = useState("");
  const [bots, setBots] = useState<Array<{
    id: string;
    name: string;
    description: string;
    domain: string;
    status: string;
    conversations: number;
    totalUsers: number;
    lastActive: string;
    assignedUsers: string[];
    createdAt: string;
    lastConversation: string | null;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [users, setUsers] = useState<Array<{id: string; firstName: string; lastName: string; email: string; role: string; createdAt: string; name: string; status: string}>>([]);
  const [botAssignments, setBotAssignments] = useState<Array<{id: string; userId: string; botId: string; assignedAt: string; userEmail: string; userName: string; userStatus: string; userRole: string; botName: string}>>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [assigningUser, setAssigningUser] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Array<{
    id: string;
    message: string;
    sender: 'user' | 'bot';
    timestamp: string;
    isTestMessage: boolean;
  }>>([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Array<{
    id: string;
    message: string;
    sender: 'user' | 'bot';
    timestamp: string;
    isTestMessage: boolean;
  }> | null>(null);
  const [showConversationDetail, setShowConversationDetail] = useState(false);

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
          setBots([]); // Set empty array instead of mock data
        }
      } catch (error) {
        console.error('Error fetching bots:', error);
        setBots([]); // Set empty array instead of mock data
      } finally {
        setLoading(false);
      }
    };

    fetchBots();
  }, []);

  // Fetch users and assignments when modal opens
  const fetchUsersAndAssignments = async (botId: string) => {
    setLoadingUsers(true);
    try {
      // Fetch users invited by manager
      console.log('Fetching users from /api/manager/users...');
      const usersResponse = await fetch('/api/manager/users');
      console.log('Users response status:', usersResponse.status);
      
      let transformedUsers: Array<{id: string; firstName: string; lastName: string; email: string; role: string; createdAt: string; name: string; status: string}> = [];
      
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        console.log('Users data received:', usersData);
        // Transform users to include name and status properties
        transformedUsers = (usersData.users || []).map((user: {id: string; firstName: string; lastName: string; email: string; role: string; createdAt: string; name: string}) => ({
          ...user,
          name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email.split('@')[0] || 'Unknown User',
          status: 'online' // Default status, could be enhanced later
        }));
        setUsers(transformedUsers);
      } else {
        const errorData = await usersResponse.json();
        console.error('Error fetching users:', errorData);
      }

      // Fetch assignments for this bot
      console.log('Fetching assignments for bot:', botId);
      const assignmentsResponse = await fetch(`/api/manager/bot-assignments?botId=${botId}`);
      console.log('Assignments response status:', assignmentsResponse.status);
      
      if (assignmentsResponse.ok) {
        const assignmentsData = await assignmentsResponse.json();
        console.log('Assignments data received:', assignmentsData);
        
        // Use the assignments data directly from API (it already includes user info)
        setBotAssignments(assignmentsData.assignments || []);
      } else {
        const errorData = await assignmentsResponse.json();
        console.error('Error fetching assignments:', errorData);
      }
    } catch (error) {
      console.error('Error fetching users and assignments:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Close dropdown when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        setOpenDropdown(null);
        setDropdownPosition(null);
      }
    };

    const handleScroll = () => {
      if (openDropdown) {
        setOpenDropdown(null);
        setDropdownPosition(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true); // Use capture phase
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [openDropdown]);

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
    // Validate required fields
    if (!newBot.name.trim()) {
      console.error('Bot name is required');
      return;
    }

    // Close modal and redirect to payment
    setShowCreateModal(false);
    
    // Redirect to payment page with bot details
    const params = new URLSearchParams({
      plan: 'signup',
      botName: newBot.name,
      botDescription: newBot.description || '',
    });
    
    window.location.href = `/payment?${params.toString()}`;
  };

  const handleAssignUser = async (botId: string, userId: string) => {
    console.log('Assigning user:', { botId, userId });
    setAssigningUser(userId);
    try {
      const response = await fetch('/api/manager/assign-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          botId,
          userId,
          action: 'assign'
        }),
      });

      console.log('Assign user response status:', response.status);
      const responseData = await response.json();
      console.log('Assign user response data:', responseData);

      if (response.ok) {
        // Refresh assignments
        await fetchUsersAndAssignments(botId);
        console.log('User assigned successfully, refreshing assignments');
        
        // Refresh the main bots list to update totalUsers count
        const refreshResponse = await fetch('/api/manager/bots');
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          setBots(refreshData.bots || []);
        }
        
        setSuccessMessage('User assigned successfully!');
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        console.error('Failed to assign user:', responseData);
      }
    } catch (error) {
      console.error('Error assigning user:', error);
    } finally {
      setAssigningUser(null);
    }
  };

  const handleUnassignUser = async (botId: string, userId: string) => {
    try {
      const response = await fetch('/api/manager/assign-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          botId,
          userId,
          action: 'unassign'
        }),
      });

      if (response.ok) {
        // Refresh assignments
        await fetchUsersAndAssignments(botId);
        
        // Refresh the main bots list to update totalUsers count
        const refreshResponse = await fetch('/api/manager/bots');
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          setBots(refreshData.bots || []);
        }
      } else {
        console.error('Failed to unassign user');
      }
    } catch (error) {
      console.error('Error unassigning user:', error);
    }
  };

  const handleEditBot = (bot: {id: string; name: string; description: string; domain: string; status: string}) => {
    setEditBot({
      id: bot.id,
      name: bot.name,
      description: bot.description,
      domain: bot.domain,
      status: bot.status
    });
    setShowEditModal(true);
  };

  const handleUpdateBot = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/manager/update-bot', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editBot),
      });

      if (response.ok) {
        // Refresh the bots list
        const refreshResponse = await fetch('/api/manager/bots');
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          setBots(refreshData.bots || []);
        }
        setShowEditModal(false);
        setEditBot({ id: "", name: "", description: "", domain: "", status: "active" });
      } else {
        const error = await response.json();
        console.error('Failed to update bot:', error.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating bot:', error);
    }
  };

  const handleTestBot = (bot: {id: string; name: string}) => {
    // Navigate to test bot page in manager dashboard (same layout) without page reload
    router.push(`/manager-dashboard/test-bot?botId=${bot.id}`);
  };

  const handleBotSettings = (bot: {id: string; name: string}) => {
    console.log('Bot settings:', bot);
    // TODO: Implement bot settings functionality
    console.log('Bot settings functionality will be implemented soon');
  };

  const handleDeleteBot = async (bot: {id: string; name: string}) => {
    try {
      const response = await fetch(`/api/manager/delete-bot`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ botId: bot.id }),
      });

      if (response.ok) {
        // Refresh the bots list
        const refreshResponse = await fetch('/api/manager/bots');
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          setBots(refreshData.bots || []);
        }
      } else {
        const error = await response.json();
        console.error('Failed to delete bot:', error.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error deleting bot:', error);
    }
  };

  const handleViewConversations = (bot: { id: string; name: string; assignedUsers: string[]; }) => {
    setSelectedBot(bot);
    setShowConversationHistory(true);
    fetchBotConversations(bot.id);
  };

  // Fetch conversations for a specific bot
  const fetchBotConversations = async (botId: string) => {
    setLoadingConversations(true);
    try {
      const response = await fetch(`/api/conversations/bot/${botId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.conversations) {
          setConversations(data.conversations);
        }
      } else {
        console.error('Failed to fetch conversations');
        setConversations([]);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setConversations([]);
    } finally {
      setLoadingConversations(false);
    }
  };

  const getBotConversations = (botId: string) => {
    return conversations.filter(conv => conv.sender === 'user' || conv.sender === 'bot');
  };

  // Group conversations into sessions (conversations that happen within 30 minutes of each other)
  const groupConversationsIntoSessions = (conversations: Array<{
    id: string;
    message: string;
    sender: 'user' | 'bot';
    timestamp: string;
    isTestMessage: boolean;
  }>) => {
    if (conversations.length === 0) return [];

    // Sort conversations by timestamp
    const sortedConversations = [...conversations].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const sessions: Array<{
      id: string;
      messages: Array<{
        id: string;
        message: string;
        sender: 'user' | 'bot';
        timestamp: string;
        isTestMessage: boolean;
      }>;
      startTime: string;
      endTime: string;
      isTestSession: boolean;
      messageCount: number;
    }> = [];

    let currentSession: Array<{
      id: string;
      message: string;
      sender: 'user' | 'bot';
      timestamp: string;
      isTestMessage: boolean;
    }> = [];

    for (let i = 0; i < sortedConversations.length; i++) {
      const currentMessage = sortedConversations[i];
      
      if (currentSession.length === 0) {
        // Start a new session
        currentSession = [currentMessage];
      } else {
        const lastMessage = currentSession[currentSession.length - 1];
        const timeDiff = new Date(currentMessage.timestamp).getTime() - new Date(lastMessage.timestamp).getTime();
        
        // If messages are within 30 minutes, add to current session
        if (timeDiff <= 30 * 60 * 1000) {
          currentSession.push(currentMessage);
        } else {
          // Create a new session
          sessions.push({
            id: `session-${sessions.length + 1}`,
            messages: [...currentSession],
            startTime: currentSession[0].timestamp,
            endTime: currentSession[currentSession.length - 1].timestamp,
            isTestSession: currentSession.some(msg => msg.isTestMessage),
            messageCount: currentSession.length
          });
          currentSession = [currentMessage];
        }
      }
    }

    // Add the last session
    if (currentSession.length > 0) {
      sessions.push({
        id: `session-${sessions.length + 1}`,
        messages: [...currentSession],
        startTime: currentSession[0].timestamp,
        endTime: currentSession[currentSession.length - 1].timestamp,
        isTestSession: currentSession.some(msg => msg.isTestMessage),
        messageCount: currentSession.length
      });
    }

    return sessions;
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString([], { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleConversationClick = (session: {
    id: string;
    messages: Array<{
      id: string;
      message: string;
      sender: 'user' | 'bot';
      timestamp: string;
      isTestMessage: boolean;
    }>;
    startTime: string;
    endTime: string;
    isTestSession: boolean;
    messageCount: number;
  }) => {
    setSelectedConversation(session.messages);
    setShowConversationDetail(true);
  };

  const handleBackToSessions = () => {
    setSelectedConversation(null);
    setShowConversationDetail(false);
  };

  const handleStatusToggle = (botId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    console.log(`Toggling bot ${botId} status from ${currentStatus} to ${newStatus}`);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInviteUser = async () => {
    // Validate email format
    if (!validateEmail(inviteData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setEmailError('');
    
    try {
      const response = await fetch('/api/admin/invite-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...inviteData,
          role: 'user' // Always set role to 'user' for manager invitations
        }),
      });

      if (response.ok) {
        console.log('Invitation sent successfully');
        setInviteData({ email: '', name: '' });
        setShowInviteModal(false);
      } else {
        console.error('Failed to send invitation');
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen overflow-visible">
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
              <h2 className="text-xl font-semibold text-gray-900">Invite New User</h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-900 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">Send an invitation to a new user to join your team</p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="invite-name" className="text-gray-900 font-medium">Full Name</Label>
                <Input
                  id="invite-name"
                  placeholder="Enter full name"
                  value={inviteData.name}
                  onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                  className="mt-1 text-gray-900"
                />
              </div>
              <div>
                <Label htmlFor="invite-email" className="text-gray-900 font-medium">Email Address</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="Enter email address"
                  value={inviteData.email}
                  onChange={(e) => {
                    setInviteData({ ...inviteData, email: e.target.value });
                    if (emailError) setEmailError(''); // Clear error when user types
                  }}
                  className={`mt-1 text-gray-900 ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600">{emailError}</p>
                )}
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
                className="text-gray-900 hover:text-gray-700 transition-colors"
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

      {/* Edit Bot Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Bot</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-900 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateBot} className="space-y-4">
              <div>
                <Label htmlFor="edit-bot-name" className="text-sm font-medium text-gray-700 mb-2 block">
                  Bot Name
                </Label>
                <Input
                  id="edit-bot-name"
                  type="text"
                  value={editBot.name}
                  onChange={(e) => setEditBot({ ...editBot, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#6566F1] text-gray-900"
                  placeholder="Enter bot name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="edit-bot-domain" className="text-sm font-medium text-gray-700 mb-2 block">
                  Domain
                </Label>
                <Input
                  id="edit-bot-domain"
                  type="text"
                  value={editBot.domain}
                  onChange={(e) => setEditBot({ ...editBot, domain: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#6566F1] text-gray-900"
                  placeholder="Enter domain (e.g., Real Estate)"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="edit-bot-description" className="text-sm font-medium text-gray-700 mb-2 block">
                  Description
                </Label>
                <textarea
                  id="edit-bot-description"
                  value={editBot.description}
                  onChange={(e) => setEditBot({ ...editBot, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#6566F1] text-gray-900 resize-none"
                  placeholder="Enter bot description"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="edit-bot-status" className="text-sm font-medium text-gray-700 mb-2 block">
                  Status
                </Label>
                <select
                  id="edit-bot-status"
                  value={editBot.status}
                  onChange={(e) => setEditBot({ ...editBot, status: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#6566F1] text-gray-900"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-6 py-2 bg-[#6566F1] hover:bg-[#5A5BD9] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Bot
                </Button>
              </div>
            </form>
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
            className="pl-10 border-gray-300 focus:border-[#6566F1] focus:ring-[#6566F1] rounded-xl h-11 text-gray-900"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:border-[#6566F1] focus:ring-2 focus:ring-[#6566F1]/20 bg-white h-11 text-gray-900 font-medium shadow-sm hover:border-gray-400 transition-colors duration-200 appearance-none cursor-pointer text-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
        >
          <option value="all" className="text-gray-900 py-2">All</option>
          <option value="active" className="text-gray-900 py-2">Active</option>
          <option value="paused" className="text-gray-900 py-2">Paused</option>
          <option value="inactive" className="text-gray-900 py-2">Inactive</option>
        </select>
        </div>
        
        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Bots</p>
                <p className="text-lg font-bold text-blue-600">{filteredBots.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Conversations</p>
                <p className="text-lg font-bold text-green-600">{filteredBots.reduce((sum, bot) => sum + bot.conversations, 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#F0F0FE] border border-[#E0E0FE] p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#6566F1] rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Assigned Users</p>
                <p className="text-lg font-bold text-[#4A4BC8]">{filteredBots.reduce((sum, bot) => sum + bot.totalUsers, 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="border border-gray-300 bg-white rounded-2xl overflow-hidden">
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
          <Card key={bot.id} className="group relative border border-gray-300 bg-white hover:shadow-xl hover:shadow-[#6566F1]/10 transition-all duration-300 rounded-2xl overflow-visible hover:-translate-y-1 z-10">
            {/* Gradient Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6566F1]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            

            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6566F1] to-[#5A5BD9] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-[#6566F1]/25 transition-shadow duration-300">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    {/* Status indicator */}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${
                      bot.status === 'active' ? 'bg-green-500' : 
                      bot.status === 'paused' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg font-semibold truncate group-hover:text-[#6566F1] transition-colors duration-200">{bot.name}</CardTitle>
                    <p className="text-sm text-gray-500 truncate">{bot.domain}</p>
                  </div>
                </div>
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-[#6566F1]/10 hover:text-[#6566F1] transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Button clicked for bot:', bot.id);
                      
                      const rect = e.currentTarget.getBoundingClientRect();
                      setDropdownPosition({
                        top: rect.bottom + 5,
                        left: rect.left
                      });
                      
                      setOpenDropdown(openDropdown === bot.id ? null : bot.id);
                    }}
                    title="Bot options"
                  >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              {/* Status and Last Active */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={`${getStatusColor(bot.status)} font-medium px-3 py-1`}>
                  {bot.status}
                </Badge>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{bot.lastActive}</span>
              </div>

              {/* Metrics Grid */}
                             <div className="grid grid-cols-2 gap-3">
                 <div className="bg-green-50 border border-green-200 p-3 rounded-lg group-hover:bg-green-100 transition-colors duration-200">
                  <div className="flex items-center space-x-2">
                     <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center">
                       <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                     <div>
                       <p className="text-xs text-gray-600">Conversations</p>
                       <p className="text-lg font-bold text-green-600">{bot.conversations}</p>
                     </div>
                   </div>
                 </div>
                 
                 <div className="bg-[#F0F0FE] border border-[#E0E0FE] p-3 rounded-lg group-hover:bg-[#E8E8FE] transition-colors duration-200">
                  <div className="flex items-center space-x-2">
                     <div className="w-8 h-8 bg-[#6566F1] rounded-lg flex items-center justify-center">
                       <Users className="w-4 h-4 text-white" />
                  </div>
                     <div>
                       <p className="text-xs text-gray-600">Assigned</p>
                       <p className="text-lg font-bold text-[#4A4BC8]">{bot.totalUsers}</p>
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
                  className="flex-1 bg-[#5A5BD9] hover:bg-[#4A4BC8] text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-[#6566F1]/25 group/btn"
                  onClick={() => {
                    setSelectedBot(bot);
                    setShowAssignModal(true);
                    fetchUsersAndAssignments(bot.id);
                  }}
                >
                  <Users className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
                  Manage Users
                </Button>
              </div>

              {/* Quick Stats Bar */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Created: {new Date(bot.createdAt).toLocaleDateString()}</span>
                  <span>Last: {bot.lastConversation ? new Date(bot.lastConversation).toLocaleDateString() : 'Never'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
        )}
      </div>

      {/* User Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#6566F1] flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Manage Bot Users</span>
              </h2>
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSuccessMessage(null);
                }}
                className="text-gray-900 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Success Message */}
            {successMessage && (
              <div className="mx-6 mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {successMessage}
              </div>
            )}
            {/* Modal Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Assigned Users */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Assigned Users</h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {loadingUsers ? (
                      <div className="text-center py-8 text-gray-500">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto mb-2"></div>
                        Loading...
                      </div>
                    ) : botAssignments.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                        <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        No users assigned to this bot
                      </div>
                    ) : (
                      botAssignments.map((assignment) => (
                        <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            {getStatusIcon(assignment.userStatus)}
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm text-gray-900 truncate">{assignment.userName}</p>
                              <p className="text-xs text-gray-500 truncate">{assignment.userEmail}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                            onClick={() => handleUnassignUser(selectedBot?.id || '', assignment.userId)}
                            className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 flex-shrink-0 ml-3"
                      >
                            <UserMinus className="w-3 h-3 mr-1" />
                            Unassign
                      </Button>
                    </div>
                      ))
                    )}
                </div>
              </div>

              {/* Available Users */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Available Users</h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {loadingUsers ? (
                      <div className="text-center py-8 text-gray-500">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto mb-2"></div>
                        Loading...
                      </div>
                    ) : (
                      <>
                        {users.filter(user => !botAssignments.some(assignment => assignment.userId === user.id)).length === 0 ? (
                          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                            <UserPlus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            No available users to assign
                          </div>
                        ) : (
                          users.filter(user => !botAssignments.some(assignment => assignment.userId === user.id)).map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex items-center space-x-3 flex-1 min-w-0">
                        {getStatusIcon(user.status)}
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium text-sm text-gray-900 truncate">{user.name}</p>
                                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                                onClick={() => handleAssignUser(selectedBot?.id || '', user.id)}
                                disabled={assigningUser === user.id}
                                className="bg-[#6566F1] hover:bg-[#5A5BD9] text-white disabled:opacity-50 flex-shrink-0 ml-3 min-w-[80px]"
                              >
                                {assigningUser === user.id ? (
                                  <>
                                    <div className="w-3 h-3 mr-1 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    <span className="text-xs">Assigning...</span>
                                  </>
                                ) : (
                                  <>
                                    <UserPlus className="w-3 h-3 mr-1" />
                                    Assign
                                  </>
                                )}
                      </Button>
                    </div>
                          ))
                        )}
                      </>
                    )}
                </div>
              </div>
            </div>
            </div>

          </div>
        </div>
      )}

      {/* Conversation History Modal */}
      {showConversationHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl mx-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#6566F1] flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Conversation History - {selectedBot?.name}</span>
              </h2>
              <button
                onClick={() => {
                  setShowConversationHistory(false);
                  setShowConversationDetail(false);
                  setSelectedConversation(null);
                }}
                className="text-gray-900 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {!showConversationDetail ? (
              // Conversation Sessions View
          <div className="space-y-4 max-h-96 overflow-y-auto">
                {loadingConversations ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6566F1] mx-auto mb-4"></div>
                    <p className="text-sm">Loading conversations...</p>
                  </div>
                ) : groupConversationsIntoSessions(getBotConversations(selectedBot?.id || '')).length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">No Conversations Yet</h3>
                    <p className="text-sm">This bot hasn&apos;t had any conversations yet.</p>
                  </div>
                ) : (
                  <div className="space-y-2 pb-24">
                    {groupConversationsIntoSessions(getBotConversations(selectedBot?.id || '')).map((session) => {
                      // Get first user message for title generation
                      const firstUserMessage = session.messages.find(msg => msg.sender === 'user');
                      const lastMessage = session.messages[session.messages.length - 1];
                      
                      // Generate relevant title based on content
                      let conversationTitle = 'Conversation Session';
                      
                      // For now, always show "Bot Testing" for all conversations to test the UI
                      // TODO: Fix the isTestMessage detection logic
                      conversationTitle = 'Bot Testing';
                      
                      return (
                        <div
                          key={session.id}
                          onClick={() => handleConversationClick(session)}
                          className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md hover:border-[#6566F1] transition-all duration-200 cursor-pointer group"
                        >
                  <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <div className="w-6 h-6 bg-gradient-to-br from-[#6566F1] to-[#5A5BD9] rounded-md flex items-center justify-center flex-shrink-0">
                                <MessageSquare className="w-3 h-3 text-white" />
                    </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#6566F1] transition-colors truncate">
                                  {conversationTitle}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  {formatTime(lastMessage.timestamp)}
                      </p>
                    </div>
                  </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              {session.isTestSession && (
                                <Badge className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1">
                                  Test
                                </Badge>
                              )}
                              <Badge className="bg-[#6566F1] text-white text-xs px-2 py-1">
                                {session.messageCount}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              // Individual Conversation Detail View
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handleBackToSessions}
                    className="flex items-center space-x-2 text-[#6566F1] hover:text-[#5A5BD9] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Sessions</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-[#6566F1] text-white">
                      {selectedConversation?.length} messages
                    </Badge>
                    {selectedConversation?.some(msg => msg.isTestMessage) && (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Test Session
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto bg-gray-50 rounded-xl p-4">
                  {selectedConversation?.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-[#6566F1] text-white' 
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-medium">
                            {message.sender === 'user' ? 'You' : 'Bot'}
                          </span>
                          {message.isTestMessage && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                              Test
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
            ))}
          </div>
          </div>
            )}
    </div>
        </div>
      )}

      {/* Portal-based Dropdown Menu */}
      {openDropdown && dropdownPosition && typeof window !== 'undefined' && createPortal(
        <>
          {/* Backdrop to close dropdown */}
          <div 
            className="fixed inset-0 z-[9999998]" 
            onClick={() => {
              setOpenDropdown(null);
              setDropdownPosition(null);
            }}
          />
          
          {/* Dropdown Menu */}
          <div 
            className="fixed w-48 bg-white border border-gray-200 shadow-xl rounded-lg z-[9999999]"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left
            }}
          >
            <div className="py-1">
              <button
                onClick={() => {
                  const bot = bots.find(b => b.id === openDropdown);
                  if (bot) {
                    handleViewConversations(bot);
                  }
                  setOpenDropdown(null);
                  setDropdownPosition(null);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                View Conversations
              </button>
              <button
                onClick={() => {
                  const bot = bots.find(b => b.id === openDropdown);
                  if (bot) {
                    setSelectedBot(bot);
                    setShowAssignModal(true);
                    fetchUsersAndAssignments(bot.id);
                  }
                  setOpenDropdown(null);
                  setDropdownPosition(null);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </button>
              <button
                onClick={() => {
                  const bot = bots.find(b => b.id === openDropdown);
                  if (bot) {
                    handleEditBot(bot);
                  }
                  setOpenDropdown(null);
                  setDropdownPosition(null);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Bot
              </button>
              <button
                onClick={() => {
                  const bot = bots.find(b => b.id === openDropdown);
                  if (bot) {
                    handleTestBot(bot);
                  }
                  setOpenDropdown(null);
                  setDropdownPosition(null);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Test Bot
              </button>
              <button
                onClick={() => {
                  const bot = bots.find(b => b.id === openDropdown);
                  if (bot) {
                    handleBotSettings(bot);
                  }
                  setOpenDropdown(null);
                  setDropdownPosition(null);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <div className="border-t border-gray-200 my-1"></div>
              <button
                onClick={() => {
                  const bot = bots.find(b => b.id === openDropdown);
                  if (bot) {
                    handleDeleteBot(bot);
                  }
                  setOpenDropdown(null);
                  setDropdownPosition(null);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Bot
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
