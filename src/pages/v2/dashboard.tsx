import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { 
  FaNetworkWired, FaUserPlus, FaChartBar, FaExchangeAlt, FaArrowUp, FaUsers,
  FaChartLine, FaLightbulb, FaTable, FaClipboardCheck, FaInfoCircle, FaMicrophone, FaBell,
  FaAddressBook, FaCog, FaPlug, FaVolumeUp
} from 'react-icons/fa';
import VoiceSearch from '../../components/v2/VoiceSearch';
import StreamingVoiceSearch from '../../components/v2/StreamingVoiceSearch';
import ReferralSearchResults from '../../components/v2/ReferralSearchResults';
import ProactiveNotifications from '../../components/v2/ProactiveNotifications';
import VoiceSettings from '../../components/v2/VoiceSettings';
import ContactManager from '../../components/v2/ContactManager';
import IntegrationSettings from '../../components/v2/IntegrationSettings';
import { processWithGemini, processNotificationResponse } from '../../utils/geminiService';

// Sample data for the dashboard
const referralStats = {
  sent: 42,
  received: 28,
  pending: 15,
  converted: 32,
  conversionRate: 68,
  revenueGenerated: 24850
};

const recentActivity = [
  { 
    id: 1, 
    type: 'referral_sent', 
    title: 'Referral Sent', 
    description: 'You sent John Smith to Sarah Williams for Estate Planning',
    time: '2 hours ago',
    status: 'pending'
  },
  { 
    id: 2, 
    type: 'referral_received', 
    title: 'Referral Received', 
    description: 'Michael Chen sent Robert Johnson to you for Financial Planning',
    time: '4 hours ago',
    status: 'new'
  },
  { 
    id: 3, 
    type: 'enrichment', 
    title: 'Contact Enriched', 
    description: 'AI enriched 5 contacts with additional information',
    time: '1 day ago',
    status: 'completed'
  },
  { 
    id: 4, 
    type: 'match', 
    title: 'New Match', 
    description: 'Found potential match: Jessica Davis (Insurance Agent)',
    time: '2 days ago',
    status: 'new'
  }
];

const upcomingMeetings = [
  {
    id: 1,
    contact: 'Sarah Williams',
    title: 'Discuss Referral Partnership',
    time: 'Today, 3:00 PM',
    type: 'virtual',
    notes: 'Estate Attorney with 8+ years experience, specializes in high net worth clients'
  },
  {
    id: 2,
    contact: 'Michael Chen',
    title: 'Quarterly Referral Review',
    time: 'Tomorrow, 11:00 AM',
    type: 'in-person',
    notes: 'CPA, sent 5 referrals last quarter, discuss tax planning opportunities'
  },
  {
    id: 3,
    contact: 'New Contact: Jessica Davis',
    title: 'Introduction Meeting',
    time: 'May 10, 2:30 PM',
    type: 'virtual',
    notes: 'Insurance Agent, potential new referral partner, 92% match score'
  }
];

const referrals = [
  {
    id: 1,
    name: 'John Smith',
    type: 'Sent',
    to: 'Sarah Williams',
    date: '2025-05-05',
    status: 'Pending'
  },
  {
    id: 2,
    name: 'Robert Johnson',
    type: 'Received',
    from: 'Michael Chen',
    date: '2025-05-04',
    status: 'Accepted'
  },
  {
    id: 3,
    name: 'Jessica Davis',
    type: 'Sent',
    to: 'Rebecca Martinez',
    date: '2025-05-02',
    status: 'Completed'
  }
];

export default function DashboardV2() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isProcessing, setIsProcessing] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [searchResults, setSearchResults] = useState<{ networkPartners: any[], externalPartners: any[] }>({ networkPartners: [], externalPartners: [] });
  const [clientName, setClientName] = useState<string | undefined>();
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voiceRate, setVoiceRate] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedRate = localStorage.getItem('voiceRate');
      return savedRate ? parseFloat(savedRate) : 0.9;
    }
    return 0.9;
  });
  
  const [voicePitch, setVoicePitch] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedPitch = localStorage.getItem('voicePitch');
      return savedPitch ? parseFloat(savedPitch) : 1.05;
    }
    return 1.05;
  });
  
  // Save voice settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('voiceRate', voiceRate.toString());
      localStorage.setItem('voicePitch', voicePitch.toString());
      // We can't save the actual voice object, but we can save the name
      if (selectedVoice) {
        localStorage.setItem('voiceName', selectedVoice.name);
        localStorage.setItem('voiceLang', selectedVoice.lang);
      }
    }
  }, [selectedVoice, voiceRate, voicePitch]);
  
  const [notifications, setNotifications] = useState<any[]>([
    {
      id: 'notif1',
      type: 'reminder',
      title: 'Pending Lead Update',
      message: "It's been 48 hours since you sent James, your top estate planning attorney, a lead in regards to Bob Smith. James has not updated his contact status with Bob yet. Should I send him a reminder?",
      time: 'Just now',
      actionRequired: true,
      contactName: 'James Wilson'
    }
  ]);
  
  // Initialize speech synthesis and load voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.length);
        
        // Try to restore voice from localStorage
        const savedVoiceName = localStorage.getItem('voiceName');
        const savedVoiceLang = localStorage.getItem('voiceLang');
        
        if (savedVoiceName && savedVoiceLang) {
          console.log('Trying to restore saved voice:', savedVoiceName, savedVoiceLang);
          // Try to find the exact voice
          const savedVoice = voices.find(voice => 
            voice.name === savedVoiceName && voice.lang === savedVoiceLang);
          
          if (savedVoice) {
            console.log('Restored saved voice:', savedVoice.name);
            setSelectedVoice(savedVoice);
            return;
          }
        }
        
        // Default to first English voice if available
        const englishVoice = voices.find(voice => voice.lang.includes('en-'));
        if (englishVoice) {
          console.log('Using default English voice:', englishVoice.name);
          setSelectedVoice(englishVoice);
        } else if (voices.length > 0) {
          console.log('Using first available voice:', voices[0].name);
          setSelectedVoice(voices[0]);
        }
      };
      
      // Initial load
      const initialVoices = window.speechSynthesis.getVoices();
      if (initialVoices.length > 0) {
        loadVoices();
      }
      
      // Set up event listener for when voices are loaded
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Handle voice search queries
  const handleSearch = async (query: string) => {
    setIsProcessing(true);
    setResponseText('');
    setIsResponding(false); // Reset responding state first
    
    try {
      // Extract client name if present in the query
      const clientNameMatch = query.match(/refer\s+([\w\s]+)\s+who/i);
      if (clientNameMatch && clientNameMatch[1]) {
        setClientName(clientNameMatch[1]);
      } else {
        setClientName(undefined);
      }
      
      // Process with Gemini API
      console.log('Sending query to Gemini:', query);
      
      // For testing purposes, use a simple mock response
      let mockResponse = {
        text: `I heard you say: "${query}". Here's what I found based on your query.`,
        data: {
          networkPartners: [
            {
              id: 'partner1',
              name: 'John Smith',
              company: 'Smith Financial',
              specialty: 'Financial Planning',
              location: 'New York',
              inNetwork: true,
              referralsSent: 12,
              referralsReceived: 8,
              trustScore: 9
            }
          ],
          externalPartners: []
        }
      };
      
      // Set the response text immediately for testing
      setResponseText(mockResponse.text);
      setSearchResults({
        networkPartners: mockResponse.data.networkPartners || [],
        externalPartners: mockResponse.data.externalPartners || []
      });
      
      // In a real implementation, we would use the Gemini API
      // const response = await processWithGemini(query, (partialResponse) => {
      //   setResponseText(partialResponse);
      // });
      // 
      // console.log('Received response from Gemini:', response);
      // 
      // // Update final response and search results
      // setResponseText(response.text);
      // if (response.data) {
      //   setSearchResults({
      //     networkPartners: response.data.networkPartners || [],
      //     externalPartners: response.data.externalPartners || []
      //   });
      // }
      
      // Force browser to unlock audio
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          const unlockAudio = new SpeechSynthesisUtterance(' ');
          unlockAudio.volume = 0;
          unlockAudio.rate = 10;
          window.speechSynthesis.speak(unlockAudio);
          console.log('Audio unlock attempt made before response');
        } catch (e) {
          console.log('Audio unlock attempt error:', e);
        }
      }
      
      // Delay setting isResponding to true to ensure the response text is set
      // and the speech synthesis has time to initialize properly
      setTimeout(() => {
        console.log('Setting isResponding to true to trigger speech');
        setIsResponding(true); // This triggers the speech in VoiceSearch component
        
        // Force a direct speech attempt as a backup
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          setTimeout(() => {
            try {
              const utterance = new SpeechSynthesisUtterance(mockResponse.text);
              if (selectedVoice) {
                utterance.voice = selectedVoice;
              }
              utterance.rate = voiceRate;
              utterance.pitch = voicePitch;
              window.speechSynthesis.speak(utterance);
              console.log('Backup speech attempt made directly from dashboard');
            } catch (error) {
              console.error('Error in backup speech attempt:', error);
            }
          }, 500);
        }
      }, 1000);
    } catch (error) {
      console.error('Error processing search:', error);
      setResponseText('Sorry, I encountered an error processing your request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle notification actions
  const handleNotificationAction = async (notificationId: string, action: 'accept' | 'decline' | 'remind' | 'view') => {
    const response = action === 'accept' ? 'yes' : 'no';
    
    try {
      const result = await processNotificationResponse(notificationId, response);
      
      // Remove the notification after processing
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      
      // Show the response as a new notification
      setNotifications(prev => [
        ...prev,
        {
          id: 'response-' + notificationId,
          type: 'update',
          title: action === 'accept' ? 'Reminder Sent' : 'Action Skipped',
          message: result.message,
          time: 'Just now',
          actionRequired: false
        }
      ]);
    } catch (error) {
      console.error('Error processing notification action:', error);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Referral Network Hub</h1>
            <p className="text-gray-600">Manage your professional network and referrals in one place</p>
          </div>
          <div className="flex gap-2">
            <Link 
              href="/v2/network" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaNetworkWired />
              <span>View Network</span>
            </Link>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
              <FaUserPlus />
              <span>Add Contact</span>
            </button>
          </div>
        </div>
        
        {/* Proactive Notifications */}
        {notifications.length > 0 && (
          <ProactiveNotifications 
            notifications={notifications}
            onAction={handleNotificationAction}
            selectedVoice={selectedVoice}
            voiceRate={voiceRate}
            voicePitch={voicePitch}
          />
        )}
        
        {/* Dashboard Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6 mt-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {['overview', 'voice', 'contacts', 'network', 'referrals', 'insights', 'integrations'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-1 ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab === 'voice' ? (
                    <>
                      <FaMicrophone className="text-sm" />
                      <span>Voice Search</span>
                    </>
                  ) : tab === 'contacts' ? (
                    <>
                      <FaAddressBook className="text-sm" />
                      <span>Contacts</span>
                    </>
                  ) : tab === 'integrations' ? (
                    <>
                      <FaPlug className="text-sm" />
                      <span>Integrations</span>
                    </>
                  ) : tab === 'overview' && notifications.length > 0 ? (
                    <>
                      <FaBell className="text-sm" />
                      <span>Overview</span>
                      <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {notifications.length}
                      </span>
                    </>
                  ) : (
                    <span className="capitalize">{tab}</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            {activeTab === 'voice' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Voice Assistant</h2>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        // Direct test of speech synthesis
                        const testText = "This is a test of your selected voice settings. Can you hear me now?";
                        console.log('Testing speech directly from dashboard');
                        
                        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          
                          const utterance = new SpeechSynthesisUtterance(testText);
                          
                          // Set up event handlers
                          utterance.onstart = () => console.log('Dashboard test speech started');
                          utterance.onend = () => console.log('Dashboard test speech ended');
                          utterance.onerror = (e) => console.error('Dashboard test speech error:', e);
                          
                          // Use selected voice if available
                          if (selectedVoice) {
                            console.log('Using selected voice for dashboard test:', selectedVoice.name);
                            utterance.voice = selectedVoice;
                          }
                          
                          // Use voice parameters from settings
                          utterance.rate = voiceRate;
                          utterance.pitch = voicePitch;
                          utterance.volume = 1.0;
                          
                          // Speak
                          try {
                            window.speechSynthesis.speak(utterance);
                            console.log('Dashboard test speech initiated with rate:', voiceRate, 'pitch:', voicePitch);
                          } catch (error) {
                            console.error('Error in dashboard test speech:', error);
                          }
                        }
                      }}
                      className="flex items-center justify-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <FaVolumeUp className="mr-2" /> Test Voice Settings
                    </button>
                    
                    <VoiceSettings 
                      onVoiceChange={setSelectedVoice} 
                      onRateChange={setVoiceRate}
                      onPitchChange={setVoicePitch}
                      selectedVoice={selectedVoice}
                    />
                  </div>
                </div>
                
                <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-medium mb-2">New: Two-Way Streaming Voice Conversation</h3>
                  <p className="text-sm text-gray-600 mb-4">Try our new streaming voice conversation powered by Gemini 2.0 Flash. This provides a more natural back-and-forth conversation experience.</p>
                  
                  <StreamingVoiceSearch
                    selectedVoice={selectedVoice}
                    voiceRate={voiceRate}
                    voicePitch={voicePitch}
                    onSearchResults={setSearchResults}
                  />
                </div>
                
                <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium mb-2">Original Voice Search</h3>
                  <p className="text-sm text-gray-600 mb-4">Our standard voice search functionality.</p>
                  
                  <VoiceSearch 
                    onSearch={handleSearch}
                    isProcessing={isProcessing}
                    responseText={responseText}
                    isResponding={isResponding}
                    selectedVoice={selectedVoice}
                    voiceRate={voiceRate}
                    voicePitch={voicePitch}
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Search Results</h3>
                  <ReferralSearchResults 
                    results={[
                      ...searchResults.networkPartners.map((p: any) => ({ ...p, inNetwork: true })),
                      ...searchResults.externalPartners.map((p: any) => ({ ...p, inNetwork: false }))
                    ]}
                    clientName={clientName}
                    isLoading={isProcessing}
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'contacts' && (
              <div>
                <ContactManager />
              </div>
            )}
            
            {activeTab === 'integrations' && (
              <div>
                <IntegrationSettings />
              </div>
            )}
            
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Referral Stats */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Referral Performance</h2>
                        <div className="text-sm text-gray-500">Last 30 days</div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="text-sm text-blue-700 mb-1">Sent</div>
                          <div className="text-2xl font-bold text-gray-800">{referralStats.sent}</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="text-sm text-green-700 mb-1">Received</div>
                          <div className="text-2xl font-bold text-gray-800">{referralStats.received}</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="text-sm text-purple-700 mb-1">Conversion</div>
                          <div className="text-2xl font-bold text-gray-800">{referralStats.conversionRate}%</div>
                        </div>
                        <div className="bg-emerald-50 rounded-lg p-4">
                          <div className="text-sm text-emerald-700 mb-1">Revenue</div>
                          <div className="text-2xl font-bold text-gray-800">${referralStats.revenueGenerated.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                    {/* Recent Activity Section */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                      </div>
                      <ul className="divide-y divide-gray-100">
                        {recentActivity.map((activity) => (
                          <li key={activity.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <div className="font-medium text-gray-800">{activity.title}</div>
                              <div className="text-gray-500 text-sm">{activity.description}</div>
                            </div>
                            <div className="flex items-center gap-4 mt-2 md:mt-0">
                              <span className="text-xs text-gray-400">{activity.time}</span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800'
                                : activity.status === 'completed' ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                              }`}>{activity.status}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Upcoming Meetings Section */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Upcoming Meetings</h2>
                      </div>
                      <ul className="divide-y divide-gray-100">
                        {upcomingMeetings.map((meeting) => (
                          <li key={meeting.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <div className="font-medium text-gray-800">{meeting.title}</div>
                              <div className="text-gray-500 text-sm">with {meeting.contact} &bull; {meeting.time}</div>
                              <div className="text-xs text-gray-400 mt-1">{meeting.notes}</div>
                            </div>
                            <span className={`mt-2 md:mt-0 px-2 py-1 rounded text-xs ${
                              meeting.type === 'virtual' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>{meeting.type}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'network' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Your Referral Network</h2>
                  <div className="flex gap-2">
                    <Link href="/v2/contacts" className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 flex items-center gap-1">
                      <FaUserPlus className="text-xs" />
                      <span>Add Contact</span>
                    </Link>
                    <Link href="/v2/network" className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center gap-1">
                      <FaNetworkWired className="text-xs" />
                      <span>Full Network</span>
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Network Size Card */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <FaUsers className="text-blue-500 mr-2" />
                      <h3 className="font-medium">Network Size</h3>
                    </div>
                    <p className="text-3xl font-bold">42</p>
                    <p className="text-sm text-gray-500">Professional connections</p>
                    <div className="mt-2 text-xs text-green-600 flex items-center">
                      <FaArrowUp className="mr-1" />
                      <span>+5 this month</span>
                    </div>
                  </div>
                  {/* Referral Activity Card */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <FaExchangeAlt className="text-purple-500 mr-2" />
                      <h3 className="font-medium">Referral Activity</h3>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">28</p>
                        <p className="text-sm text-gray-500">Sent</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">35</p>
                        <p className="text-sm text-gray-500">Received</p>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-green-600 flex items-center">
                      <FaArrowUp className="mr-1" />
                      <span>+12 this quarter</span>
                    </div>
                  </div>
                  {/* Network Health Card */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <FaChartBar className="text-amber-500 mr-2" />
                      <h3 className="font-medium">Network Health</h3>
                    </div>
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center mr-3">
                        <span className="text-xl font-bold text-green-600">A+</span>
                      </div>
                      <div>
                        <p className="font-medium">Excellent</p>
                        <div className="text-sm text-gray-500">Strong engagement</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Link href="/v2/network" className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
                    <FaChartLine className="mr-2" />
                    Explore Full Network Analytics
                  </Link>
                </div>
              </div>
            )}
            {activeTab === 'referrals' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Referral Activity</h2>
                  <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    <FaUserPlus />
                    New Referral
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">To/From</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {referrals.map(ref => (
                        <tr key={ref.id}>
                          <td className="px-4 py-2">{ref.name}</td>
                          <td className="px-4 py-2">{ref.type}</td>
                          <td className="px-4 py-2">{ref.type === 'Sent' ? ref.to : ref.from}</td>
                          <td className="px-4 py-2">{ref.date}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              ref.status === 'Pending' ? 'bg-yellow-100 text-yellow-800'
                              : ref.status === 'Accepted' ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                            }`}>{ref.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'insights' && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FaLightbulb className="text-yellow-400 text-2xl" />
                  <h2 className="text-xl font-semibold">Insights & Analytics</h2>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 text-blue-900">
                  <p className="mb-2"><FaInfoCircle className="inline mr-2" /> Get actionable insights about your referral network, conversion rates, and engagement trends.</p>
                  <ul className="list-disc pl-6">
                    <li>Referral conversion rate is above average this month.</li>
                    <li>Most active partner: <b>Sarah Williams</b></li>
                    <li>Strongest specialty: <b>Estate Planning</b></li>
                  </ul>
                </div>
                <div className="mt-6">
                  {/* Placeholder for future charts/analytics */}
                  <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">
                    <FaChartBar className="mx-auto text-4xl mb-2" />
                    <span>Charts and analytics coming soon...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}