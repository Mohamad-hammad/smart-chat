'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Star,
  Edit,
  Trash2,
  Bot,
  CheckCircle,
  Clock,
  ArrowLeft,
  X
} from 'lucide-react';

const TeamManagement = () => {
  const [selectedAgent, setSelectedAgent] = useState(1); // Mike Johnson is selected by default
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  // Mock data for team members
  const teamMembers = [
    {
      id: 0,
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      initials: "SC",
      role: "Senior Agent",
      status: "online",
      statusColor: "bg-[#6566F1] text-white",
      rating: "4.9",
      chats: "1247",
      phone: "+1 (555) 123-4567",
      joinedDate: "2023-01-15",
      specialties: ["Customer Service", "Technical Support"],
      currentStatus: "Available"
    },
    {
      id: 1,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      initials: "MJ",
      role: "Agent",
      status: "busy",
      statusColor: "bg-orange-500 text-white",
      rating: "4.8",
      chats: "892",
      phone: "+1 (555) 234-5678",
      joinedDate: "2023-03-20",
      specialties: ["Customer Service", "Returns"],
      currentStatus: "Currently in chat with 2 customers"
    },
    {
      id: 2,
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      initials: "LW",
      role: "Agent",
      status: "offline",
      statusColor: "bg-red-500 text-white",
      rating: "4.7",
      chats: "634",
      phone: "+1 (555) 345-6789",
      joinedDate: "2023-05-10",
      specialties: ["Sales", "Billing"],
      currentStatus: "Offline"
    }
  ];

  // Mock data for bot assignments
  const botAssignments = [
    {
      name: "Support Bot",
      description: "Customer Support",
      status: "assigned",
      statusColor: "bg-[#6566F1] text-white"
    },
    {
      name: "Sales Bot",
      description: "Sales Assistant",
      status: "unassigned",
      statusColor: "bg-gray-100 text-gray-600"
    }
  ];

  const selectedAgentData = teamMembers[selectedAgent];

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
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#6566F1] hover:bg-[#5A5BD9] text-white rounded-xl px-6 py-3"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add New Member
        </Button>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your agents, assignments, and team structure.</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Team Members */}
        <Card className="bg-white rounded-2xl shadow-sm border-0">
          <CardHeader className="p-6 pb-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600" />
              <CardTitle className="text-lg font-bold text-gray-900">Team Members (3)</CardTitle>
            </div>
            <p className="text-sm text-gray-600">Manage your support team and their assignments.</p>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div 
                  key={member.id}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-md ${
                    selectedAgent === member.id 
                      ? 'border-[#6566F1] bg-[#6566F1]/10' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAgent(member.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">{member.initials}</span>
                      </div>
                      
                      {/* Member Info */}
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-xs text-gray-600">{member.email}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200">
                            {member.role}
                          </Badge>
                          <Badge className={`text-xs ${member.statusColor} ${member.status === 'online' ? 'hover:bg-[#5A5BD9]' : member.status === 'busy' ? 'hover:bg-orange-600' : 'hover:bg-red-600'} transition-colors duration-200`}>
                            {member.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Performance */}
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-xs font-medium text-gray-900">{member.rating}</span>
                        </div>
                        <p className="text-xs text-gray-600">{member.chats} chats</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Agent Details */}
        <div className="space-y-6">
          {/* Agent Profile */}
          <Card className="bg-white rounded-2xl shadow-sm border-0">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-600" />
                <CardTitle className="text-lg font-bold text-gray-900">{selectedAgentData.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              {/* Role */}
              <div>
                <p className="text-sm font-medium text-gray-600">Role</p>
                <p className="text-gray-900">{selectedAgentData.role}</p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{selectedAgentData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{selectedAgentData.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">Joined {selectedAgentData.joinedDate}</span>
                </div>
              </div>

              {/* Performance */}
              <div className="flex items-center space-x-3">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-900">{selectedAgentData.rating} rating • {selectedAgentData.chats} total chats</span>
              </div>

              {/* Specialties */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {selectedAgentData.specialties.map((specialty, index) => (
                    <Badge key={index} className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Current Status */}
              <div>
                <p className="text-sm font-medium text-gray-600">Current Status</p>
                <p className="text-gray-900">{selectedAgentData.currentStatus}</p>
              </div>
            </CardContent>
          </Card>

          {/* Bot Assignment */}
          <Card className="bg-white rounded-2xl shadow-sm border-0">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-gray-600" />
                <CardTitle className="text-lg font-bold text-gray-900">Bot Assignment</CardTitle>
              </div>
              <p className="text-sm text-gray-600">Manage which bots this agent can handle.</p>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                {botAssignments.map((bot, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">{bot.name}</h4>
                      <p className="text-sm text-gray-600">{bot.description}</p>
                    </div>
                    <Button 
                      className={`rounded-xl px-4 py-2 text-sm ${
                        bot.status === 'assigned' 
                          ? 'bg-[#6566F1] text-white hover:bg-[#5A5BD9]' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } transition-colors duration-200`}
                    >
                      {bot.status === 'assigned' ? 'Assigned' : 'Assign'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add New Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Member</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">Add a new team member to your customer support team.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={newMember.firstName}
                  onChange={(e) => setNewMember({...newMember, firstName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6566F1] focus:border-transparent text-gray-900"
                  placeholder="Enter first name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={newMember.lastName}
                  onChange={(e) => setNewMember({...newMember, lastName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6566F1] focus:border-transparent text-gray-900"
                  placeholder="Enter last name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6566F1] focus:border-transparent text-gray-900"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6566F1] focus:border-transparent text-gray-900"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle add member logic here
                  console.log('Adding new member:', newMember);
                  setIsAddModalOpen(false);
                  setNewMember({ firstName: '', lastName: '', email: '', phone: '' });
                }}
                className="bg-[#6566F1] hover:bg-[#5A5BD9] text-white px-4 py-2"
              >
                Add Member
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
