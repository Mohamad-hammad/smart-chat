'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Bot, 
  BarChart3, 
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquare,
  Users,
  MessageCircle,
  Home,
  LogOut,
  User,
  Shield,
  AlertTriangle
} from 'lucide-react';

interface UserDashboardLayoutProps {
  children: React.ReactNode;
}

const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data for issue counts
  const [issueCounts] = useState({
    total: 3,
    resolved: 1,
    pending: 2
  });

  // Navigation items for user dashboard
  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/user-dashboard' },
    { id: 'bots', label: 'My Bots', icon: Bot, path: '/user-dashboard/bots' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/user-dashboard/analytics' },
    { id: 'conversations', label: 'Conversations', icon: MessageSquare, path: '/user-dashboard/conversations' },
    { 
      id: 'report-issue', 
      label: 'Report an Issue', 
      icon: AlertTriangle, 
      path: '/user-dashboard/report-issue',
      badge: issueCounts.pending > 0 ? issueCounts.pending : null,
      subtitle: `${issueCounts.resolved}/${issueCounts.total} resolved`
    },
    { id: 'help', label: 'Help', icon: HelpCircle, path: '/user-dashboard/help' },
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getActiveSection = () => {
    if (pathname === '/user-dashboard') return 'overview';
    if (pathname.includes('/bots')) return 'bots';
    if (pathname.includes('/analytics')) return 'analytics';
    if (pathname.includes('/conversations')) return 'conversations';
    if (pathname.includes('/report-issue')) return 'report-issue';
    if (pathname.includes('/help')) return 'help';
    return 'overview';
  };

  const activeSection = getActiveSection();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
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
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      }`}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#7F82F3] rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              <span className="text-base font-bold text-gray-900 whitespace-nowrap">
                User Portal
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center ${
                    sidebarCollapsed ? 'justify-center px-2' : 'px-3'
                  } py-2 text-xs font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#6566F1]/10 text-[#6566F1]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#6566F1]' : 'text-[#7F82F3]'} flex-shrink-0`} />
                    {item.badge && !sidebarCollapsed && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                    <div className="ml-3 flex flex-col items-start">
                      <span className="whitespace-nowrap">{item.label}</span>
                      {item.subtitle && (
                        <span className="text-[10px] text-gray-500 whitespace-nowrap">{item.subtitle}</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Access Section */}
        <div className={`mt-8 px-3 transition-all duration-300 ${sidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="bg-[#6566F1]/10 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#6566F1] rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="overflow-hidden">
                <h3 className="text-sm font-semibold text-gray-900 whitespace-nowrap">User Access</h3>
                <p className="text-xs text-gray-600 whitespace-nowrap">Personal workspace</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            <button
              onClick={() => handleNavigation('/')}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center px-2' : 'px-3'
              } py-2 text-xs font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-50`}
            >
              <Home className="w-5 h-5 text-[#7F82F3] flex-shrink-0" />
              <div className={`overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                <span className="ml-3 whitespace-nowrap">Home</span>
              </div>
            </button>
            <button
              onClick={handleSignOut}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center px-2' : 'px-3'
              } py-2 text-xs font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-50`}
            >
              <LogOut className="w-5 h-5 text-[#7F82F3] flex-shrink-0" />
              <div className={`overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                <span className="ml-3 whitespace-nowrap">Logout</span>
              </div>
            </button>
          </div>
        </nav>

        {/* Sidebar Toggle Button */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
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

      {/* User Top Bar */}
      <div className="fixed top-0 right-0 left-72 bg-white border-b border-gray-200 h-16 z-30 transition-all duration-300" style={{ left: sidebarCollapsed ? '80px' : '288px' }}>
        <div className="flex items-center justify-between h-full px-6">
          <h1 className="text-lg font-bold text-gray-900">User Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 transition-all duration-300" style={{ marginLeft: sidebarCollapsed ? '80px' : '288px' }}>
        <div className="min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
