'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
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
  X,
  MessageSquare,
  Users,
  Home,
  LogOut,
  Shield,
  Database,
  Activity,
  Menu,
  AlertTriangle
} from 'lucide-react';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ 
  children
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const userRole = (session.user as { role?: string }).role;
      setIsAdmin(userRole === 'admin');
      setLoading(false);
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router]);

  // Get the base dashboard path
  const basePath = '/admin-dashboard';
  
  // Admin-specific navigation items
  const getNavItems = () => {
    return [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: basePath },
      { id: 'user-management', label: 'User Management', icon: Users, path: `${basePath}/user-management` },
      { id: 'bots', label: 'All Bots', icon: Bot, path: `${basePath}/bots` },
      { id: 'analytics', label: 'Analytics', icon: BarChart3, path: `${basePath}/analytics` },
      { id: 'chatbot-analytics', label: 'Chatbot Analytics', icon: MessageSquare, path: `${basePath}/chatbot-analytics` },
      { id: 'chatbot-issues', label: 'Chatbot Issues', icon: AlertTriangle, path: `${basePath}/chatbot-issues` },
      { id: 'billing-management', label: 'Billing Management', icon: CreditCard, path: `${basePath}/billing-management` },
      { id: 'system-health', label: 'System Health', icon: Activity, path: `${basePath}/system-health` },
      { id: 'database', label: 'Database', icon: Database, path: `${basePath}/database` },
      { id: 'settings', label: 'Settings', icon: Settings, path: `${basePath}/settings` },
      { id: 'help', label: 'Help', icon: HelpCircle, path: `${basePath}/help` },
    ];
  };

  const navItems = getNavItems();

  // Determine active section based on pathname
  const getActiveSection = () => {
    if (pathname === basePath) return 'overview';
    if (pathname.includes('/user-management')) return 'user-management';
    if (pathname.includes('/analytics')) return 'analytics';
    if (pathname.includes('/billing-management')) return 'billing-management';
    if (pathname.includes('/bots')) return 'bots';
    if (pathname.includes('/chatbot-analytics')) return 'chatbot-analytics';
    if (pathname.includes('/chatbot-issues')) return 'chatbot-issues';
    if (pathname.includes('/system-health')) return 'system-health';
    if (pathname.includes('/database')) return 'database';
    if (pathname.includes('/settings')) return 'settings';
    if (pathname.includes('/help')) return 'help';
    return 'overview';
  };

  const activeSection = getActiveSection();

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6566F1]"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don&apos;t have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-lg border border-gray-200"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      } bg-white border-r border-gray-200 shadow-lg`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#6566F1] rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                <span className="text-base font-bold text-gray-900 whitespace-nowrap">
                  Admin Portal
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-3">
            <div className="space-y-1">
              {navItems.map((item) => {
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
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#6566F1]' : 'text-[#7F82F3]'} flex-shrink-0`} />
                    <div className={`overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                      <span className="ml-3 whitespace-nowrap">{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Admin Access Section */}
          <div className={`mt-8 px-3 transition-all duration-300 ${sidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="bg-[#6566F1]/10 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#6566F1] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-sm font-semibold text-gray-900 whitespace-nowrap">Admin Access</h3>
                  <p className="text-xs text-gray-600 whitespace-nowrap">Full system control</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Top Bar */}
      <div className="fixed top-0 right-0 left-72 bg-white border-b border-gray-200 h-16 z-30 transition-all duration-300" style={{ left: sidebarCollapsed ? '80px' : '288px' }}>
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900">Admin Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
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

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed inset-y-0 left-0 w-72 bg-white">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#6566F1] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Admin Portal</h1>
                  <p className="text-xs text-gray-500">System Administration</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <nav className="px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isActive
                        ? 'bg-[#6566F1] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardLayout;
