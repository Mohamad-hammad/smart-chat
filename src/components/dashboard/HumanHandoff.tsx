'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  ArrowLeft,
  RefreshCw,
  Users,
  ChevronDown
} from 'lucide-react';

const HumanHandoff = () => {
  const [selectedConversation, setSelectedConversation] = useState(2); // Bob Wilson selected by default

  // Mock data for active conversations
  const activeConversations = [
    {
      id: 0,
      customer: "John Doe",
      issue: "Payment not processing",
      status: "Pending",
      statusColor: "text-orange-500",
      statusIcon: Clock,
      priority: "high",
      priorityColor: "bg-red-500 text-white",
      time: "3 minutes",
      lastMessage: "I need to speak with a human about my paymen..."
    },
    {
      id: 1,
      customer: "Jane Smith",
      issue: "Technical support needed",
      status: "Active",
      statusColor: "text-green-500",
      statusIcon: CheckCircle,
      priority: "medium",
      priorityColor: "bg-[#6566F1] text-white",
      time: "0 minutes",
      agent: "Sarah Chen",
      lastMessage: "The agent is reviewing your case"
    },
    {
      id: 2,
      customer: "Bob Wilson",
      issue: "Billing question",
      status: "Pending",
      statusColor: "text-orange-500",
      statusIcon: Clock,
      priority: "low",
      priorityColor: "bg-gray-500 text-white",
      time: "1 minute",
      lastMessage: "Can someone explain my latest invoice?"
    }
  ];

  // Mock data for available agents
  const availableAgents = [
    {
      name: "Sarah Chen",
      initials: "SC",
      status: "online",
      statusColor: "bg-[#6566F1] text-white",
      activeChats: "2 chats"
    },
    {
      name: "Mike Johnson",
      initials: "MJ",
      status: "online",
      statusColor: "bg-[#6566F1] text-white",
      activeChats: "3 chats"
    },
    {
      name: "Lisa Wang",
      initials: "LW",
      status: "busy",
      statusColor: "bg-gray-500 text-white",
      activeChats: "1 chats"
    }
  ];

  // Mock conversation history
  const conversationHistory = [
    {
      sender: "Bot",
      message: "Hi there! What technical issue can I help you with?",
      time: "10:25 AM",
      isBot: true
    },
    {
      sender: "Jane Smith",
      message: "My app keeps crashing when I try to upload files",
      time: "10:26 AM",
      isBot: false
    },
    {
      sender: "Agent",
      message: "Hi Jane, I'm Sarah and I'll be helping you today. Can you tell me what device you're using?",
      time: "10:35 AM",
      isBot: true
    }
  ];

  const selectedConv = activeConversations[selectedConversation];

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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Human Handoff Management</h1>
        <p className="text-sm text-gray-600 mt-1">Monitor AI conversations and manage agent assignments.</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Active Conversations */}
        <div className="lg:col-span-1">
          <Card className="bg-white rounded-2xl shadow-sm border-0">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-gray-600" />
                <CardTitle className="text-lg font-bold text-gray-900">Active Conversations</CardTitle>
              </div>
              <p className="text-sm text-gray-600">Monitor ongoing chats and handoff requests.</p>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                {activeConversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-md ${
                      selectedConversation === conversation.id 
                        ? 'border-[#6566F1] bg-[#6566F1]/10' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="space-y-3">
                      {/* Customer and Issue */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{conversation.customer}</h3>
                        <p className="text-xs text-gray-600">{conversation.issue}</p>
                      </div>

                      {/* Status and Priority */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <conversation.statusIcon className={`w-4 h-4 ${conversation.statusColor}`} />
                          <span className={`text-xs font-medium ${conversation.statusColor}`}>
                            {conversation.status}
                          </span>
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                        <Badge className={`text-xs ${conversation.priorityColor}`}>
                          {conversation.priority}
                        </Badge>
                      </div>

                      {/* Agent Assignment (if active) */}
                      {conversation.agent && (
                        <div className="text-xs text-gray-600">
                          Agent: {conversation.agent}
                        </div>
                      )}

                      {/* Last Message */}
                      <div className="text-xs text-gray-500">
                        {conversation.lastMessage}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Conversation Details */}
        <div className="lg:col-span-2">
          <Card className="bg-white rounded-2xl shadow-sm border-0">
            <CardContent className="p-6">
              {/* Customer Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                    <h2 className="text-lg font-bold text-gray-900">{selectedConv.customer}</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-[#6566F1] text-white">{selectedConv.priority} priority</Badge>
                    <Badge className="bg-gray-100 text-gray-600">Tech Bot</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{selectedConv.customer.toLowerCase().replace(' ', '.')}@email.com</p>
              </div>

              {/* Summary */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Wait time: {selectedConv.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Issue: {selectedConv.issue}</span>
                </div>
              </div>

              {/* Actions Required */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-2">Actions Required</h3>
                <p className="text-sm text-gray-600 mb-4">Assign an agent or resume bot assistance.</p>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <select className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#6566F1] focus:border-transparent">
                      <option>Assign to agent</option>
                      <option>Sarah Chen</option>
                      <option>Mike Johnson</option>
                      <option>Lisa Wang</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <Button className="bg-[#6566F1] hover:bg-[#5A5BD9] text-white rounded-lg px-4 py-2">
                    <Users className="w-4 h-4 mr-2" />
                    Assign Agent
                  </Button>
                  <span className="text-gray-500">or</span>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resume Bot
                  </Button>
                </div>
              </div>

              {/* Conversation History */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Conversation History</h3>
                <p className="text-sm text-gray-600 mb-4">Review the chat transcript.</p>
                
                <div className="space-y-4">
                  {conversationHistory.map((message, index) => (
                    <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.isBot 
                          ? 'bg-gray-100 text-gray-900' 
                          : 'bg-[#6566F1] text-white'
                      }`}>
                        <div className="flex items-start space-x-2">
                          {message.isBot ? (
                            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-gray-600">B</span>
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-[#6566F1] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-white">C</span>
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 ${
                              message.isBot ? 'text-gray-500' : 'text-white/70'
                            }`}>
                              {message.sender} • {message.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Available Agents Section */}
      <Card className="bg-white rounded-2xl shadow-sm border-0">
        <CardHeader className="p-6 pb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-600" />
            <CardTitle className="text-lg font-bold text-gray-900">Available Agents</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-3">
            {availableAgents.map((agent, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">{agent.initials}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{agent.name}</h4>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`text-xs ${agent.statusColor}`}>
                    {agent.status}
                  </Badge>
                  <span className="text-xs text-gray-600">{agent.activeChats}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HumanHandoff;
