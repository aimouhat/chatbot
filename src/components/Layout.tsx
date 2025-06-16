import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Brain, 
  FileText, 
  Key, 
  BarChart3, 
  Settings,
  Bot,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Models', href: '/models', icon: Brain },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'API Keys', href: '/api-keys', icon: Key },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed height and better spacing for large screens */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left side - Menu button (mobile) + AI Platform */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              <div className="flex items-center space-x-3">
                <Bot className="h-10 w-10 text-emerald-600" />
                <div className="hidden sm:block">
                  <span className="text-2xl font-bold text-gray-900">AI Platform</span>
                  <p className="text-sm text-gray-500">Model Management System</p>
                </div>
                <span className="text-lg font-bold text-gray-900 sm:hidden">AI</span>
              </div>
            </div>

            {/* Center - Company Logos with better spacing */}
            <div className="flex items-center justify-center space-x-8 lg:space-x-12">
              <div className="flex flex-col items-center">
                <img 
                  src="/INTEGRATED-removebg-preview.png" 
                  alt="Integrated Exploratory Mines" 
                  className="h-10 w-auto object-contain lg:h-14"
                />
                <span className="text-xs text-gray-500 mt-1 hidden lg:block">Integrated Mines</span>
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src="/ocpp.png" 
                  alt="OCP Mining" 
                  className="h-10 w-auto object-contain lg:h-14"
                />
                <span className="text-xs text-gray-500 mt-1 hidden lg:block">OCP Mining</span>
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src="/Future-removebg-preview.png" 
                  alt="Future is Mine" 
                  className="h-10 w-auto object-contain lg:h-14"
                />
                <span className="text-xs text-gray-500 mt-1 hidden lg:block">Future is Mine</span>
              </div>
            </div>

            {/* Right side - User menu with better design */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System Online</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">A</span>
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </div>
      )}

      {/* Sidebar - Better width and spacing */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:inset-0 flex flex-col mt-20 lg:mt-0`}>
        
        {/* Desktop Sidebar Header */}
        <div className="hidden lg:flex h-20 items-center justify-center border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <Bot className="h-10 w-10 text-emerald-600" />
            <div>
              <span className="text-xl font-bold text-gray-900">AI Platform</span>
              <p className="text-sm text-gray-500">Management Console</p>
            </div>
          </div>
        </div>
        
        {/* Navigation with better spacing */}
        <nav className="flex-1 mt-8 px-6 pb-4 overflow-y-auto">
          <ul className="space-y-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-4 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-700 shadow-sm border-l-4 border-emerald-500'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* Sidebar footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="px-4 py-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">System Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">All Systems Operational</span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content with better spacing for large screens */}
      <div className="lg:pl-72">
        <main className="py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;