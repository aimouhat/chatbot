import React, { useState } from 'react';
import { FileText, Upload, Trash2, Eye, Download, Plus, AlertTriangle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  status: 'processed' | 'processing' | 'failed';
  chunks: number;
}

interface ModelDocumentsProps {
  modelId: string;
  modelName: string;
}

const ModelDocuments: React.FC<ModelDocumentsProps> = ({ modelId, modelName }) => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Customer Support Guidelines.pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'processed',
      chunks: 156,
    },
    {
      id: '2',
      name: 'Product FAQ.docx',
      size: '856 KB',
      uploadDate: '2024-01-14',
      status: 'processing',
      chunks: 0,
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isRetraining, setIsRetraining] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments(docs => docs.filter(doc => doc.id !== docId));
    // Here you would also trigger vector database update
    updateVectorDatabase();
  };

  const updateVectorDatabase = () => {
    // Simulate vector database update
    console.log(`Updating vector database for model ${modelId}`);
    // This would trigger a backend process to rebuild the vector database
    // excluding the deleted documents
  };

  const handleRetrain = () => {
    setIsRetraining(true);
    // Simulate retraining process
    setTimeout(() => {
      setIsRetraining(false);
      console.log(`Model ${modelName} retrained successfully`);
    }, 3000);
  };

  const totalChunks = documents.reduce((sum, doc) => sum + doc.chunks, 0);
  const processedDocs = documents.filter(doc => doc.status === 'processed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Training Documents</h3>
          <p className="text-sm text-gray-600">
            {processedDocs} processed documents • {totalChunks} total chunks
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Documents
          </button>
          <button
            onClick={handleRetrain}
            disabled={isRetraining}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isRetraining ? (
              <>
                <div className="animate-spin h-4 w-4 mr-1 border-2 border-white border-t-transparent rounded-full"></div>
                Retraining...
              </>
            ) : (
              'Retrain Model'
            )}
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chunks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.uploadDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.chunks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-emerald-600 hover:text-emerald-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Download className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Training Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Training Information</h4>
            <p className="text-sm text-blue-800 mt-1">
              Each model maintains its own separate document collection and vector database. 
              When you add or remove documents, the model will need to be retrained to reflect these changes.
            </p>
            <ul className="text-sm text-blue-800 mt-2 space-y-1">
              <li>• Adding documents: New content will be processed and added to the model's knowledge base</li>
              <li>• Removing documents: Vector database will be updated to exclude deleted content</li>
              <li>• Retraining: Recommended after significant document changes for optimal performance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Training Documents</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
              <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX, TXT files up to 10MB</p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="mt-4 inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                Choose Files
              </label>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Documents added to this model will only be available for this specific model. 
                Other models will not have access to these documents unless you add them separately.
              </p>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                Upload & Process
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelDocuments;