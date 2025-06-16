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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Menu button (mobile) + AI Platform */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              <div className="flex items-center space-x-2">
                <Bot className="h-8 w-8 text-emerald-600" />
                <span className="text-xl font-bold text-gray-900 hidden sm:block">AI Platform</span>
                <span className="text-lg font-bold text-gray-900 sm:hidden">AI</span>
              </div>
            </div>

            {/* Center - Company Logos */}
            <div className="flex items-center justify-center space-x-4 sm:space-x-6 lg:space-x-8">
              <img 
                src="/INTEGRATED-removebg-preview.png" 
                alt="Integrated Exploratory Mines" 
                className="h-8 w-auto object-contain sm:h-10 lg:h-12"
              />
              <img 
                src="/ocpp.png" 
                alt="OCP Mining" 
                className="h-8 w-auto object-contain sm:h-10 lg:h-12"
              />
              <img 
                src="/Future-removebg-preview.png" 
                alt="Future is Mine" 
                className="h-8 w-auto object-contain sm:h-10 lg:h-12"
              />
            </div>

            {/* Right side - User menu or additional actions */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-medium text-sm">U</span>
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

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:inset-0 flex flex-col mt-16 lg:mt-0`}>
        
        {/* Desktop Sidebar Header */}
        <div className="hidden lg:flex h-16 items-center justify-center border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">AI Platform</span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 mt-6 px-4 pb-4 overflow-y-auto">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 pt-16 lg:pt-0">
        <main className="py-4 lg:py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;