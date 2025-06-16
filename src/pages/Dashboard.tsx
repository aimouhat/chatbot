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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your AI Model Management Platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <span className="text-sm text-gray-900">{activity.action}</span>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              <Brain className="h-4 w-4 mr-2" />
              Train New Model
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FileText className="h-4 w-4 mr-2" />
              Upload Documents
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Key className="h-4 w-4 mr-2" />
              Generate API Key
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Training Queue</span>
              <span className="text-sm font-medium text-green-600">2 jobs running</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Response Time</span>
              <span className="text-sm font-medium text-green-600">142ms avg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Storage Used</span>
              <span className="text-sm font-medium text-yellow-600">68% (3.4GB)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">System Health</span>
              <span className="text-sm font-medium text-green-600">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;