import React from 'react';
import { Brain, FileText, Key, Activity, TrendingUp, Users, ArrowUpRight, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Active Models', value: '12', icon: Brain, change: '+2.1%', changeType: 'positive', description: 'Currently running' },
    { name: 'Documents Processed', value: '1,429', icon: FileText, change: '+12.5%', changeType: 'positive', description: 'Total processed' },
    { name: 'API Calls Today', value: '8,942', icon: Activity, change: '+4.3%', changeType: 'positive', description: 'Requests handled' },
    { name: 'Active API Keys', value: '24', icon: Key, change: '+1.2%', changeType: 'positive', description: 'Keys in use' },
  ];

  const recentActivity = [
    { id: 1, action: 'Model "Customer Support Bot" trained successfully', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'New document uploaded: "Product Manual v2.1"', time: '15 minutes ago', type: 'info' },
    { id: 3, action: 'API key "prod-key-001" generated', time: '1 hour ago', type: 'info' },
    { id: 4, action: 'High API usage detected on key "dev-key-003"', time: '2 hours ago', type: 'warning' },
    { id: 5, action: 'Model "Technical Documentation" deployment completed', time: '3 hours ago', type: 'success' },
  ];

  const quickActions = [
    { name: 'Train New Model', icon: Brain, color: 'emerald', description: 'Create and train a new AI model' },
    { name: 'Upload Documents', icon: FileText, color: 'blue', description: 'Add training documents' },
    { name: 'Generate API Key', icon: Key, color: 'purple', description: 'Create new API access key' },
    { name: 'View Analytics', icon: TrendingUp, color: 'orange', description: 'Monitor system performance' },
  ];

  return (
    <div className="responsive-spacing">
      {/* Enhanced Header */}
      <div className="text-center lg:text-left mb-12">
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4">
          AI Platform Dashboard
        </h1>
        <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto lg:mx-0">
          Welcome to your comprehensive AI Model Management System
        </p>
        <div className="mt-6 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>All systems operational</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>Last updated: 2 minutes ago</span>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8 mb-12">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover-lift">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.name}</p>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
              <div className="p-3 lg:p-4 bg-emerald-100 rounded-xl ml-4">
                <stat.icon className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="ml-2 text-sm font-medium text-emerald-600">{stat.change}</span>
              <span className="ml-2 text-sm text-gray-500">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">
        {/* Recent Activity - Takes 2 columns on XL screens */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Recent Activity</h2>
              <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                View all
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-base lg:text-lg text-gray-900 font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              {quickActions.map((action) => (
                <button
                  key={action.name}
                  className="w-full flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 text-left group"
                >
                  <div className={`p-3 rounded-lg bg-${action.color}-100 group-hover:bg-${action.color}-200 transition-colors`}>
                    <action.icon className={`h-5 w-5 text-${action.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{action.name}</p>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">System Status</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-base font-medium text-gray-700">Training Queue</span>
                  <p className="text-sm text-gray-500">Active training jobs</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-green-600">2</span>
                  <p className="text-sm text-gray-500">running</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-base font-medium text-gray-700">API Response Time</span>
                  <p className="text-sm text-gray-500">Average response time</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-green-600">142ms</span>
                  <p className="text-sm text-gray-500">avg</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-base font-medium text-gray-700">Storage Used</span>
                  <p className="text-sm text-gray-500">Total storage utilization</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-yellow-600">68%</span>
                  <p className="text-sm text-gray-500">3.4GB</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-base font-medium text-gray-700">System Health</span>
                  <p className="text-sm text-gray-500">Overall system status</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;