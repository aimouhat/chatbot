import React, { useState } from 'react';
import { Brain, Plus, Play, Pause, Trash2, Settings, Download, Code, FileText, ArrowLeft } from 'lucide-react';
import ApiCodeGenerator from '../components/ApiCodeGenerator';
import ModelDocuments from '../components/ModelDocuments';

const Models = () => {
  const [models, setModels] = useState([
    {
      id: '1',
      name: 'Customer Support Bot',
      status: 'active',
      accuracy: 94.2,
      lastTrained: '2024-01-15',
      documents: 156,
      apiCalls: 2847,
      apiKey: 'sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567',
    },
    {
      id: '2',
      name: 'Technical Documentation Assistant',
      status: 'training',
      accuracy: 0,
      lastTrained: null,
      documents: 89,
      apiCalls: 0,
      apiKey: 'sk-proj-def456ghi789jkl012mno345pqr678stu901vwx234yz567abc123',
    },
    {
      id: '3',
      name: 'Product Knowledge Base',
      status: 'inactive',
      accuracy: 91.8,
      lastTrained: '2024-01-10',
      documents: 234,
      apiCalls: 1523,
      apiKey: 'sk-proj-ghi789jkl012mno345pqr678stu901vwx234yz567abc123def456',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'api'>('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateModel = () => {
    if (newModelName.trim()) {
      const newModel = {
        id: Date.now().toString(),
        name: newModelName,
        status: 'inactive',
        accuracy: 0,
        lastTrained: null,
        documents: 0,
        apiCalls: 0,
        apiKey: `sk-proj-${Math.random().toString(36).substring(2, 50)}${Math.random().toString(36).substring(2, 50)}`,
      };
      setModels([...models, newModel]);
      setNewModelName('');
      setShowCreateModal(false);
    }
  };

  const selectedModelData = selectedModel ? models.find(m => m.id === selectedModel) : null;

  if (selectedModel && selectedModelData) {
    return (
      <div className="responsive-spacing">
        {/* Header */}
        <div className="responsive-flex justify-between">
          <div className="responsive-flex">
            <button
              onClick={() => setSelectedModel(null)}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-2 sm:mb-0"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Back to Models</span>
              <span className="sm:hidden">Back</span>
            </button>
            <div>
              <h1 className="responsive-title">{selectedModelData.name}</h1>
              <p className="mt-2 responsive-subtitle">
                Manage model configuration, documents, and API integration
              </p>
            </div>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedModelData.status)}`}>
            {selectedModelData.status}
          </span>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max">
            {[
              { id: 'overview', name: 'Overview', icon: Brain },
              { id: 'documents', name: 'Documents', icon: FileText },
              { id: 'api', name: 'API Integration', icon: Code },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Model Stats */}
              <div className="responsive-card">
                <h3 className="responsive-heading text-gray-900 mb-4">Model Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="responsive-text text-gray-600">Accuracy</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedModelData.accuracy > 0 ? `${selectedModelData.accuracy}%` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="responsive-text text-gray-600">Training Documents</span>
                    <span className="text-sm font-medium text-gray-900">{selectedModelData.documents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="responsive-text text-gray-600">API Calls</span>
                    <span className="text-sm font-medium text-gray-900">{selectedModelData.apiCalls.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="responsive-text text-gray-600">Last Trained</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedModelData.lastTrained || 'Never'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Model Actions */}
              <div className="responsive-card">
                <h3 className="responsive-heading text-gray-900 mb-4">Model Actions</h3>
                <div className="mobile-button-group">
                  {selectedModelData.status === 'active' ? (
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Model
                    </button>
                  ) : (
                    <button className="btn-primary flex items-center justify-center">
                      <Play className="h-4 w-4 mr-2" />
                      {selectedModelData.status === 'training' ? 'Training...' : 'Activate Model'}
                    </button>
                  )}
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Model
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export Model
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <ModelDocuments 
              modelId={selectedModelData.id} 
              modelName={selectedModelData.name} 
            />
          )}

          {activeTab === 'api' && (
            <ApiCodeGenerator 
              apiKey={selectedModelData.apiKey}
              modelName={selectedModelData.name}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="responsive-spacing">
      {/* Header */}
      <div className="responsive-flex justify-between">
        <div>
          <h1 className="responsive-title">Models</h1>
          <p className="mt-2 responsive-subtitle">
            Manage and monitor your AI models
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Create Model</span>
          <span className="sm:hidden">Create</span>
        </button>
      </div>

      {/* Models Grid */}
      <div className="responsive-grid">
        {models.map((model) => (
          <div key={model.id} className="responsive-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                  <Brain className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 truncate">{model.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(model.status)}`}>
                    {model.status}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-600 flex-shrink-0 ml-2">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Accuracy</span>
                <span className="text-sm font-medium text-gray-900">
                  {model.accuracy > 0 ? `${model.accuracy}%` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Documents</span>
                <span className="text-sm font-medium text-gray-900">{model.documents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">API Calls</span>
                <span className="text-sm font-medium text-gray-900">{model.apiCalls.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Trained</span>
                <span className="text-sm font-medium text-gray-900">
                  {model.lastTrained || 'Never'}
                </span>
              </div>
            </div>

            <div className="mt-6 mobile-button-group">
              <button 
                onClick={() => setSelectedModel(model.id)}
                className="btn-primary flex items-center justify-center"
              >
                <Settings className="h-4 w-4 mr-1" />
                Manage
              </button>
              <button className="btn-secondary flex items-center justify-center">
                <Code className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Model Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="mobile-modal responsive-card">
            <h2 className="responsive-heading text-gray-900 mb-4">Create New Model</h2>
            <div className="mobile-form">
              <div className="form-group">
                <label>Model Name</label>
                <input
                  type="text"
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  placeholder="Enter model name..."
                />
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  Each model will have its own separate document collection and vector database. 
                  You can train each model with different sets of documents.
                </p>
              </div>
            </div>
            <div className="mt-6 mobile-button-group">
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateModel}
                className="btn-primary"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Models;