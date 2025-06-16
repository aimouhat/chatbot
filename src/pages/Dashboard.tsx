import React from 'react';
import { Brain, FileText, Key, Activity, TrendingUp, Users } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Active Models', value: '12', icon: Brain, change: '+2.1%', changeType: 'positive' },
    { name: 'Documents Processed', value: '1,429', icon: FileText, change: '+12.5%', changeType: 'positive' },
    { name: 'API Calls Today', value: '8,942', icon: Activity, change: '+4.3%', changeType: 'positive' },
    { name: 'Active API Keys', value: '24', icon: Key, change: '+1.2%', changeType: 'positive' },
  ];

  const recentActivity = [
    { id: 1, action: 'Model "Customer Support Bot" trained successfully', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'New document uploaded: "Product Manual v2.1"', time: '15 minutes ago', type: 'info' },
    { id: 3, action: 'API key "prod-key-001" generated', time: '1 hour ago', type: 'info' },
    { id: 4, action: 'High API usage detected on key "dev-key-003"', time: '2 hours ago', type: 'warning' },
  ];

  return (
    <div className="responsive-spacing">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="responsive-title">Dashboard</h1>
        <p className="mt-2 responsive-subtitle">
          Welcome to your AI Model Management Platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="responsive-stats-grid">
        {stats.map((stat) => (
          <div key={stat.name} className="responsive-card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mobile-stat-value text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg ml-4">
                <stat.icon className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="ml-1 text-sm font-medium text-emerald-600">{stat.change}</span>
              <span className="ml-1 text-sm text-gray-500">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="responsive-card">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="responsive-heading text-gray-900">Recent Activity</h2>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="responsive-text text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="responsive-card">
          <h3 className="responsive-heading text-gray-900 mb-4">Quick Actions</h3>
          <div className="mobile-button-group">
            <button className="btn-primary">
              <Brain className="h-4 w-4 mr-2" />
              Train New Model
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <FileText className="h-4 w-4 mr-2" />
              Upload Documents
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              <Key className="h-4 w-4 mr-2" />
              Generate API Key
            </button>
          </div>
        </div>

        <div className="responsive-card">
          <h3 className="responsive-heading text-gray-900 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="responsive-text text-gray-600">Training Queue</span>
              <span className="text-sm font-medium text-green-600">2 jobs running</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="responsive-text text-gray-600">API Response Time</span>
              <span className="text-sm font-medium text-green-600">142ms avg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="responsive-text text-gray-600">Storage Used</span>
              <span className="text-sm font-medium text-yellow-600">68% (3.4GB)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="responsive-text text-gray-600">System Health</span>
              <span className="text-sm font-medium text-green-600">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;