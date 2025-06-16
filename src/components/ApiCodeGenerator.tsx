import React, { useState } from 'react';
import { Copy, Code, Download, Eye, EyeOff } from 'lucide-react';

interface ApiCodeGeneratorProps {
  apiKey: string;
  modelName: string;
  baseUrl?: string;
}

const ApiCodeGenerator: React.FC<ApiCodeGeneratorProps> = ({ 
  apiKey, 
  modelName, 
  baseUrl = 'http://localhost:5000' 
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [showApiKey, setShowApiKey] = useState(false);
  const [includeWidget, setIncludeWidget] = useState(true);

  const languages = [
    { id: 'javascript', name: 'JavaScript', extension: 'js' },
    { id: 'python', name: 'Python', extension: 'py' },
    { id: 'curl', name: 'cURL', extension: 'sh' },
    { id: 'php', name: 'PHP', extension: 'php' },
  ];

  const generateCode = () => {
    const displayApiKey = showApiKey ? apiKey : `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`;
    
    switch (selectedLanguage) {
      case 'javascript':
        return `// AI Model Integration - ${modelName}
const API_KEY = '${displayApiKey}';
const BASE_URL = '${baseUrl}';
const MODEL_NAME = '${modelName}';

class AIModelClient {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'Authorization': \`Bearer \${apiKey}\`,
      'Content-Type': 'application/json'
    };
  }

  async chat(message, sessionId = null) {
    try {
      const response = await fetch(\`\${this.baseUrl}/api/chat\`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          message: message,
          model: MODEL_NAME,
          session_id: sessionId
        })
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error calling AI model:', error);
      throw error;
    }
  }

  async getModels() {
    try {
      const response = await fetch(\`\${this.baseUrl}/api/models\`, {
        method: 'GET',
        headers: this.headers
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }
}

// Usage Example
const aiClient = new AIModelClient(API_KEY, BASE_URL);

// Send a message
aiClient.chat('Hello, how can you help me?')
  .then(response => {
    console.log('AI Response:', response.message);
  })
  .catch(error => {
    console.error('Error:', error);
  });`;

      case 'python':
        return `# AI Model Integration - ${modelName}
import requests
import json

class AIModelClient:
    def __init__(self, api_key, base_url):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
    
    def chat(self, message, session_id=None):
        """Send a message to the AI model"""
        try:
            payload = {
                'message': message,
                'model': '${modelName}',
                'session_id': session_id
            }
            
            response = requests.post(
                f'{self.base_url}/api/chat',
                headers=self.headers,
                json=payload
            )
            
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.RequestException as e:
            print(f'Error calling AI model: {e}')
            raise
    
    def get_models(self):
        """Get available models"""
        try:
            response = requests.get(
                f'{self.base_url}/api/models',
                headers=self.headers
            )
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.RequestException as e:
            print(f'Error fetching models: {e}')
            raise

# Usage Example
API_KEY = '${displayApiKey}'
BASE_URL = '${baseUrl}'

ai_client = AIModelClient(API_KEY, BASE_URL)

# Send a message
try:
    response = ai_client.chat('Hello, how can you help me?')
    print('AI Response:', response['message'])
except Exception as e:
    print('Error:', e)`;

      case 'curl':
        return `#!/bin/bash
# AI Model Integration - ${modelName}

API_KEY="${displayApiKey}"
BASE_URL="${baseUrl}"
MODEL_NAME="${modelName}"

# Function to send chat message
send_message() {
    local message="$1"
    local session_id="$2"
    
    curl -X POST "$BASE_URL/api/chat" \\
        -H "Authorization: Bearer $API_KEY" \\
        -H "Content-Type: application/json" \\
        -d "{
            \\"message\\": \\"$message\\",
            \\"model\\": \\"$MODEL_NAME\\",
            \\"session_id\\": \\"$session_id\\"
        }"
}

# Function to get available models
get_models() {
    curl -X GET "$BASE_URL/api/models" \\
        -H "Authorization: Bearer $API_KEY" \\
        -H "Content-Type: application/json"
}

# Usage Examples
echo "Sending message to AI model..."
send_message "Hello, how can you help me?" "session_123"

echo "\\nGetting available models..."
get_models`;

      case 'php':
        return `<?php
// AI Model Integration - ${modelName}

class AIModelClient {
    private $apiKey;
    private $baseUrl;
    private $headers;
    
    public function __construct($apiKey, $baseUrl) {
        $this->apiKey = $apiKey;
        $this->baseUrl = $baseUrl;
        $this->headers = [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json'
        ];
    }
    
    public function chat($message, $sessionId = null) {
        $payload = [
            'message' => $message,
            'model' => '${modelName}',
            'session_id' => $sessionId
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->baseUrl . '/api/chat');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            throw new Exception('HTTP Error: ' . $httpCode);
        }
        
        return json_decode($response, true);
    }
    
    public function getModels() {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->baseUrl . '/api/models');
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        return json_decode($response, true);
    }
}

// Usage Example
$apiKey = '${displayApiKey}';
$baseUrl = '${baseUrl}';

$aiClient = new AIModelClient($apiKey, $baseUrl);

try {
    $response = $aiClient->chat('Hello, how can you help me?');
    echo 'AI Response: ' . $response['message'] . "\\n";
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . "\\n";
}
?>`;

      default:
        return '';
    }
  };

  const generateWidgetCode = () => {
    const displayApiKey = showApiKey ? apiKey : `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`;
    
    return `<!-- AI Chat Widget Integration -->
<div id="ai-chat-widget"></div>

<script>
(function() {
    // Configuration
    const config = {
        apiKey: '${displayApiKey}',
        baseUrl: '${baseUrl}',
        modelName: '${modelName}',
        position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
        theme: 'light', // light, dark
        primaryColor: '#2ecc71',
        title: '${modelName} Assistant'
    };

    // Widget HTML
    const widgetHTML = \`
        <div id="ai-widget-container" style="
            position: fixed;
            \${config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
            \${config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
            <div id="ai-chat-button" style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: \${config.primaryColor};
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transition: transform 0.2s;
            " onclick="toggleChat()">
                🤖
            </div>
            
            <div id="ai-chat-window" style="
                position: absolute;
                \${config.position.includes('bottom') ? 'bottom: 70px;' : 'top: 70px;'}
                \${config.position.includes('right') ? 'right: 0;' : 'left: 0;'}
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.12);
                display: none;
                flex-direction: column;
                overflow: hidden;
            ">
                <div style="
                    background: \${config.primaryColor};
                    color: white;
                    padding: 15px;
                    font-weight: 600;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <span>\${config.title}</span>
                    <button onclick="toggleChat()" style="
                        background: none;
                        border: none;
                        color: white;
                        font-size: 18px;
                        cursor: pointer;
                    ">×</button>
                </div>
                
                <div id="ai-messages" style="
                    flex: 1;
                    padding: 15px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                "></div>
                
                <div style="
                    padding: 15px;
                    border-top: 1px solid #eee;
                    display: flex;
                    gap: 10px;
                ">
                    <input id="ai-message-input" type="text" placeholder="Type your message..." style="
                        flex: 1;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 6px;
                        outline: none;
                    " onkeypress="handleKeyPress(event)">
                    <button onclick="sendMessage()" style="
                        background: \${config.primaryColor};
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 6px;
                        cursor: pointer;
                    ">Send</button>
                </div>
            </div>
        </div>
    \`;

    // Insert widget into page
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // Widget functionality
    let isOpen = false;

    window.toggleChat = function() {
        const chatWindow = document.getElementById('ai-chat-window');
        const chatButton = document.getElementById('ai-chat-button');
        
        isOpen = !isOpen;
        chatWindow.style.display = isOpen ? 'flex' : 'none';
        chatButton.style.transform = isOpen ? 'scale(0.9)' : 'scale(1)';
    };

    window.handleKeyPress = function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    window.sendMessage = async function() {
        const input = document.getElementById('ai-message-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        addMessage('user', message);
        input.value = '';
        
        try {
            const response = await fetch(\`\${config.baseUrl}/api/chat\`, {
                method: 'POST',
                headers: {
                    'Authorization': \`Bearer \${config.apiKey}\`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    model: config.modelName
                })
            });
            
            const data = await response.json();
            addMessage('assistant', data.message || data.response);
        } catch (error) {
            addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
            console.error('Chat error:', error);
        }
    };

    function addMessage(sender, text) {
        const messagesContainer = document.getElementById('ai-messages');
        const messageDiv = document.createElement('div');
        
        messageDiv.style.cssText = \`
            padding: 10px 12px;
            border-radius: 8px;
            max-width: 80%;
            word-wrap: break-word;
            \${sender === 'user' 
                ? \`background: \${config.primaryColor}; color: white; align-self: flex-end; margin-left: auto;\`
                : 'background: #f5f5f5; color: #333; align-self: flex-start;'
            }
        \`;
        
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
})();
</script>

<style>
#ai-widget-container button:hover {
    opacity: 0.9;
}

#ai-chat-button:hover {
    transform: scale(1.05) !important;
}

#ai-messages::-webkit-scrollbar {
    width: 4px;
}

#ai-messages::-webkit-scrollbar-track {
    background: #f1f1f1;
}

#ai-messages::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
}
</style>`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const downloadCode = () => {
    const selectedLang = languages.find(lang => lang.id === selectedLanguage);
    const code = includeWidget && selectedLanguage === 'javascript' 
      ? generateCode() + '\n\n' + generateWidgetCode()
      : generateCode();
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-integration-${modelName.toLowerCase().replace(/\s+/g, '-')}.${selectedLang?.extension || 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">API Integration Code</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowApiKey(!showApiKey)}
            className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {showApiKey ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {showApiKey ? 'Hide' : 'Show'} API Key
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>{lang.name}</option>
          ))}
        </select>

        {selectedLanguage === 'javascript' && (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeWidget}
              onChange={(e) => setIncludeWidget(e.target.checked)}
              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm text-gray-700">Include Chat Widget</span>
          </label>
        )}
      </div>

      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{includeWidget && selectedLanguage === 'javascript' 
            ? generateCode() + '\n\n// CHAT WIDGET CODE:\n' + generateWidgetCode()
            : generateCode()
          }</code>
        </pre>
        
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={() => copyToClipboard(
              includeWidget && selectedLanguage === 'javascript' 
                ? generateCode() + '\n\n' + generateWidgetCode()
                : generateCode()
            )}
            className="p-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={downloadCode}
            className="p-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
            title="Download code"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {includeWidget && selectedLanguage === 'javascript' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Widget Integration Instructions:</h4>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Copy the HTML/JavaScript code above</li>
            <li>2. Paste it before the closing &lt;/body&gt; tag in your HTML</li>
            <li>3. Replace the API key with your actual key</li>
            <li>4. Customize the configuration object as needed</li>
            <li>5. The chat widget will appear in the bottom-right corner</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default ApiCodeGenerator;