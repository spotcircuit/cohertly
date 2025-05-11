import React, { useState } from 'react';
import { 
  FaLinkedin, FaGoogle, FaWhatsapp, FaEnvelope, FaPhone, 
  FaCalendarAlt, FaSlack, FaTwitter, FaFacebook, FaPlus,
  FaCheck, FaCog, FaInfoCircle, FaSync, FaUnlink
} from 'react-icons/fa';

interface Integration {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  lastSync?: string;
  contactCount?: number;
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  settings?: {
    syncFrequency?: 'hourly' | 'daily' | 'weekly' | 'manual';
    autoImport?: boolean;
    categories?: string[];
  };
}

interface IntegrationSettingsProps {
  onSave?: (settings: any) => void;
}

export default function IntegrationSettings({ onSave }: IntegrationSettingsProps) {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-blue-700" />,
      connected: true,
      lastSync: '2025-05-10T14:30:00',
      contactCount: 342,
      status: 'connected',
      settings: {
        syncFrequency: 'daily',
        autoImport: true,
        categories: ['Professional', 'Business']
      }
    },
    {
      id: 'gmail',
      name: 'Gmail',
      icon: <FaGoogle className="text-red-500" />,
      connected: true,
      lastSync: '2025-05-11T09:15:00',
      contactCount: 567,
      status: 'connected',
      settings: {
        syncFrequency: 'hourly',
        autoImport: true,
        categories: ['Personal', 'Professional']
      }
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-green-500" />,
      connected: false,
      status: 'disconnected'
    },
    {
      id: 'outlook',
      name: 'Outlook',
      icon: <FaEnvelope className="text-blue-500" />,
      connected: true,
      lastSync: '2025-05-09T16:45:00',
      contactCount: 189,
      status: 'connected',
      settings: {
        syncFrequency: 'daily',
        autoImport: true,
        categories: ['Work']
      }
    },
    {
      id: 'phone',
      name: 'Phone Contacts',
      icon: <FaPhone className="text-gray-700" />,
      connected: false,
      status: 'disconnected'
    },
    {
      id: 'calendar',
      name: 'Calendar',
      icon: <FaCalendarAlt className="text-indigo-500" />,
      connected: true,
      lastSync: '2025-05-10T22:00:00',
      contactCount: 78,
      status: 'connected',
      settings: {
        syncFrequency: 'daily',
        autoImport: true,
        categories: ['Meetings', 'Events']
      }
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: <FaSlack className="text-purple-500" />,
      connected: false,
      status: 'disconnected'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: <FaTwitter className="text-blue-400" />,
      connected: false,
      status: 'disconnected'
    }
  ]);

  const [activeIntegration, setActiveIntegration] = useState<Integration | null>(null);
  const [deliverySettings, setDeliverySettings] = useState({
    voiceNotes: {
      autoTranscribe: true,
      attachOriginal: true,
      preferredDelivery: 'both' as 'email' | 'text' | 'both',
      saveToCloud: true
    }
  });

  const handleConnect = (id: string) => {
    // In a real app, this would trigger OAuth or other auth flow
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { 
              ...integration, 
              connected: true, 
              status: 'connected', 
              lastSync: new Date().toISOString(),
              contactCount: Math.floor(Math.random() * 300) + 50,
              settings: {
                syncFrequency: 'daily',
                autoImport: true,
                categories: ['New']
              }
            } 
          : integration
      )
    );
  };

  const handleDisconnect = (id: string) => {
    // In a real app, this would revoke access tokens
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { 
              ...integration, 
              connected: false, 
              status: 'disconnected',
              lastSync: undefined,
              contactCount: undefined,
              settings: undefined
            } 
          : integration
      )
    );
  };

  const handleSync = (id: string) => {
    // Set status to syncing
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, status: 'syncing' } 
          : integration
      )
    );

    // Simulate sync process
    setTimeout(() => {
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === id 
            ? { 
                ...integration, 
                status: 'connected',
                lastSync: new Date().toISOString(),
                contactCount: integration.contactCount ? integration.contactCount + Math.floor(Math.random() * 10) : 0
              } 
            : integration
        )
      );
    }, 2000);
  };

  const handleSettingChange = (integrationId: string, setting: string, value: any) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId && integration.settings
          ? { 
              ...integration, 
              settings: {
                ...integration.settings,
                [setting]: value
              }
            } 
          : integration
      )
    );
  };

  const handleDeliverySettingChange = (section: string, setting: string, value: any) => {
    setDeliverySettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const saveSettings = () => {
    if (onSave) {
      onSave({
        integrations,
        deliverySettings
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Integration Settings</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Connected Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map(integration => (
            <div 
              key={integration.id}
              className={`border rounded-lg p-4 ${
                integration.connected 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="text-xl mr-2">
                    {integration.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{integration.name}</h4>
                    <p className="text-sm text-gray-500">
                      {integration.connected 
                        ? `${integration.contactCount} contacts` 
                        : 'Not connected'}
                    </p>
                  </div>
                </div>
                <div>
                  {integration.status === 'syncing' ? (
                    <div className="animate-spin text-blue-500">
                      <FaSync />
                    </div>
                  ) : integration.connected ? (
                    <button 
                      onClick={() => setActiveIntegration(integration)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaCog />
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleConnect(integration.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              </div>
              
              {integration.connected && (
                <div className="text-xs text-gray-500 flex justify-between items-center">
                  <span>Last sync: {new Date(integration.lastSync!).toLocaleString()}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleSync(integration.id)}
                      className="text-blue-500 hover:text-blue-700"
                      disabled={integration.status === 'syncing'}
                    >
                      <FaSync className={integration.status === 'syncing' ? 'animate-spin' : ''} />
                    </button>
                    <button 
                      onClick={() => handleDisconnect(integration.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaUnlink />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Voice Note Settings</h3>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Transcription</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={deliverySettings.voiceNotes.autoTranscribe}
                    onChange={(e) => handleDeliverySettingChange('voiceNotes', 'autoTranscribe', e.target.checked)}
                    className="rounded text-blue-500"
                  />
                  <span>Auto-transcribe voice notes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={deliverySettings.voiceNotes.attachOriginal}
                    onChange={(e) => handleDeliverySettingChange('voiceNotes', 'attachOriginal', e.target.checked)}
                    className="rounded text-blue-500"
                  />
                  <span>Attach original voice note</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={deliverySettings.voiceNotes.saveToCloud}
                    onChange={(e) => handleDeliverySettingChange('voiceNotes', 'saveToCloud', e.target.checked)}
                    className="rounded text-blue-500"
                  />
                  <span>Save to cloud storage</span>
                </label>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Delivery Preferences</h4>
              <div className="space-y-2">
                <label className="block">
                  <span className="text-gray-700">Preferred delivery method:</span>
                  <select 
                    value={deliverySettings.voiceNotes.preferredDelivery}
                    onChange={(e) => handleDeliverySettingChange(
                      'voiceNotes', 
                      'preferredDelivery', 
                      e.target.value as 'email' | 'text' | 'both'
                    )}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value="email">Email only</option>
                    <option value="text">Text message only</option>
                    <option value="both">Both email and text</option>
                  </select>
                </label>
                
                <div className="mt-2 text-sm text-gray-500 flex items-start">
                  <FaInfoCircle className="mt-0.5 mr-1 flex-shrink-0" />
                  <span>
                    Voice notes will be delivered based on the contact's available information and your preferences.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={saveSettings}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Settings
        </button>
      </div>
      
      {/* Integration Settings Modal */}
      {activeIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium flex items-center">
                {activeIntegration.icon}
                <span className="ml-2">{activeIntegration.name} Settings</span>
              </h3>
              <button 
                onClick={() => setActiveIntegration(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Sync Frequency</label>
                <select 
                  value={activeIntegration.settings?.syncFrequency || 'daily'}
                  onChange={(e) => handleSettingChange(
                    activeIntegration.id, 
                    'syncFrequency', 
                    e.target.value
                  )}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="manual">Manual only</option>
                </select>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={activeIntegration.settings?.autoImport || false}
                    onChange={(e) => handleSettingChange(
                      activeIntegration.id, 
                      'autoImport', 
                      e.target.checked
                    )}
                    className="rounded text-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Automatically import new contacts
                  </span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Categories</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {['Personal', 'Professional', 'Business', 'Work', 'Meetings', 'Events', 'New'].map(category => (
                    <label key={category} className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={activeIntegration.settings?.categories?.includes(category) || false}
                        onChange={(e) => {
                          const currentCategories = activeIntegration.settings?.categories || [];
                          const newCategories = e.target.checked
                            ? [...currentCategories, category]
                            : currentCategories.filter(c => c !== category);
                          
                          handleSettingChange(
                            activeIntegration.id, 
                            'categories', 
                            newCategories
                          );
                        }}
                        className="rounded text-blue-500"
                      />
                      <span className="ml-1 mr-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setActiveIntegration(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // In a real app, this would save the settings to the server
                  setActiveIntegration(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
