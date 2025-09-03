'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Bot, 
  BarChart3, 
  Settings, 
  CreditCard, 
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquare,
  Users,
  MessageCircle,
  Home,
  LogOut,
  User
} from 'lucide-react';

interface UserDashboardLayoutProps {
  children: React.ReactNode;
}

const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Navigation items for user dashboard
  const navigationItems = [
    { id: 'overview', name: 'Overview', icon: Home, href: '/user-dashboard' },
    { id: 'bots', name: 'My Bots', icon: Bot, href: '/user-dashboard/bots' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, href: '/user-dashboard/analytics' },
    { id: 'conversations', name: 'Conversations', icon: MessageSquare, href: '/user-dashboard/conversations' },
    { id: 'settings', name: 'Settings', icon: Settings, href: '/user-dashboard/settings' },
    { id: 'help', name: 'Help', icon: HelpCircle, href: '/user-dashboard/help' },
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getActiveSection = () => {
    if (pathname === '/user-dashboard') return 'overview';
    return pathname.split('/').pop() || 'overview';
  };

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6566F1]"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#6566F1] to-[#5A5BD9] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CB</span>
            </div>
            {!sidebarCollapsed && (
              <span className="text-lg font-bold text-gray-900">ChatBot Pro</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = getActiveSection() === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.href)}
                className={`w-full flex items-center ${
                  sidebarCollapsed ? 'justify-center px-2' : 'px-3'
                } py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#6566F1] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? 'text-white' : 'text-gray-500'
                }`} />
                <div className={`overflow-hidden transition-all duration-300 ${
                  sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                }`}>
                  <span className="ml-3 whitespace-nowrap">{item.name}</span>
                </div>
              </button>
            );
          })}
        </nav>



        {/* Sidebar Toggle Button */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-gray-600" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Top Bar */}
      <div className="fixed top-0 right-0 left-0 bg-white border-b border-gray-200 z-40" style={{ marginLeft: sidebarCollapsed ? '80px' : '256px' }}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">
              {navigationItems.find(item => item.id === getActiveSection())?.name || 'User Dashboard'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#6566F1] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {session?.user?.name || session?.user?.email || 'User'}
              </span>
            </div>
            <button
              onClick={() => router.push('/api/auth/signout')}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 pt-16 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
