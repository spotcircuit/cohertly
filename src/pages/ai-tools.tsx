import Layout from '../components/Layout';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaRobot, FaNetworkWired, FaRoute, FaComments, 
  FaChartLine, FaFileAlt, FaChartBar, FaInfoCircle,
  FaArrowRight, FaPlay, FaLightbulb, FaSearch
} from 'react-icons/fa';

export default function AITools() {
  const [activeTab, setActiveTab] = useState('match-engine');

  // Simplified AI tools data
  const aiTools = [
    {
      id: 'match-engine',
      name: 'AI Match Engine',
      icon: <FaNetworkWired className="text-blue-500" size={24} />,
      description: 'Suggest ideal referral partners based on industry, client type, behavior, and past performance.',
      capabilities: [
        'Natural language processing (NLP) on user bios, emails, and notes',
        'Machine learning on referral outcomes (conversion, speed, value)',
        'Gap analysis: identifies partner types missing from your network'
      ],
      location: '/matches — Shows a carousel/grid of high-match partners',
      image: '/images/ai-match.png'
    },
    {
      id: 'referral-routing',
      name: 'AI Referral Routing',
      icon: <FaRoute className="text-indigo-500" size={24} />,
      description: 'Smart routing of client referrals based on real-time partner availability, expertise, and conversion rates.',
      capabilities: [
        'Weighted decision-making using success rates, responsiveness, and specialty',
        'Predictive analysis of likelihood to close based on past data'
      ],
      location: 'Appears in the referral submission form (auto-suggest partners)',
      image: '/images/ai-routing.png'
    },
    {
      id: 'chat-assistant',
      name: 'AI Chat Assistant',
      icon: <FaComments className="text-green-500" size={24} />,
      description: 'Conversational guidance on who to refer, follow-up timing, relationship strategy, and insights.',
      capabilities: [
        'Conversational search: "Who should I refer this client to?"',
        'Follow-up coaching: "Ping John Smith, it\'s been 10 days since last touchpoint"',
        'Can analyze sentiment in meeting transcripts or messages'
      ],
      location: '/ai or docked chat panel accessible app-wide',
      image: '/images/ai-chat.png'
    },
    {
      id: 'relationship-insights',
      name: 'AI Relationship Insights',
      icon: <FaChartLine className="text-purple-500" size={24} />,
      description: 'Provide relationship health scores and strategic guidance.',
      capabilities: [
        'Analyze communication frequency, referral volume, and conversion',
        'Rank partner engagement and recommend rekindling dormant connections'
      ],
      location: 'Part of /statistics or dashboard summary panel',
      image: '/images/ai-insights.png'
    },
    {
      id: 'activity-summarizer',
      name: 'AI Activity Summarizer',
      icon: <FaFileAlt className="text-orange-500" size={24} />,
      description: 'Summarize Zoom/Meet calls, emails, and notes to auto-populate referral records.',
      capabilities: [
        'Summarize meeting action items',
        'Extract ideal customer profile mentions or service needs',
        'Suggest whether a referral should be logged'
      ],
      location: 'Appears when logging/referring a client, or inside the partner profile sidebar',
      image: '/images/ai-summarizer.png'
    },
    {
      id: 'referral-forecasting',
      name: 'Referral Forecasting',
      icon: <FaChartBar className="text-red-500" size={24} />,
      description: 'Project revenue or referral volume based on current behavior and trends.',
      capabilities: [
        'Time-series models trained on user-specific and cohort-level data',
        'Warns if you\'re off-track from monthly goals'
      ],
      location: 'Embedded in the dashboard ("Next 30 Days Outlook")',
      image: '/images/ai-forecasting.png'
    }
  ];

  const activeTool = aiTools.find(tool => tool.id === activeTab);

  return (
    <Layout>
      {/* Hero Banner with SVG Background */}
      <div className="relative w-full overflow-hidden h-[180px] rounded-lg mb-6 bg-gradient-to-r from-blue-600 to-indigo-600">
        {/* SVG Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="circuitPattern" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="scale(0.5) rotate(0)">
                <rect width="100%" height="100%" fill="none" />
                <path d="M20,10 L80,10 M20,30 L80,30 M20,50 L80,50 M20,70 L80,70 M20,90 L80,90" stroke="#fff" strokeWidth="1" />
                <path d="M10,20 L10,80 M30,20 L30,80 M50,20 L50,80 M70,20 L70,80 M90,20 L90,80" stroke="#fff" strokeWidth="1" />
                <circle cx="10" cy="10" r="3" fill="#fff" />
                <circle cx="30" cy="10" r="3" fill="#fff" />
                <circle cx="50" cy="10" r="3" fill="#fff" />
                <circle cx="70" cy="10" r="3" fill="#fff" />
                <circle cx="90" cy="10" r="3" fill="#fff" />
                <circle cx="10" cy="30" r="3" fill="#fff" />
                <circle cx="30" cy="30" r="3" fill="#fff" />
                <circle cx="50" cy="30" r="3" fill="#fff" />
                <circle cx="70" cy="30" r="3" fill="#fff" />
                <circle cx="90" cy="30" r="3" fill="#fff" />
                <circle cx="10" cy="50" r="3" fill="#fff" />
                <circle cx="30" cy="50" r="3" fill="#fff" />
                <circle cx="50" cy="50" r="3" fill="#fff" />
                <circle cx="70" cy="50" r="3" fill="#fff" />
                <circle cx="90" cy="50" r="3" fill="#fff" />
                <circle cx="10" cy="70" r="3" fill="#fff" />
                <circle cx="30" cy="70" r="3" fill="#fff" />
                <circle cx="50" cy="70" r="3" fill="#fff" />
                <circle cx="70" cy="70" r="3" fill="#fff" />
                <circle cx="90" cy="70" r="3" fill="#fff" />
                <circle cx="10" cy="90" r="3" fill="#fff" />
                <circle cx="30" cy="90" r="3" fill="#fff" />
                <circle cx="50" cy="90" r="3" fill="#fff" />
                <circle cx="70" cy="90" r="3" fill="#fff" />
                <circle cx="90" cy="90" r="3" fill="#fff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuitPattern)" />
          </svg>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-full">
              <FaRobot className="text-white text-3xl md:text-4xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                AI Tools Suite
              </h1>
              <p className="text-white/80 text-sm md:text-base mt-1">
                Intelligent solutions to enhance your referral network
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <div className="bg-white p-4 rounded-xl shadow-md sticky top-20">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              AI Tools
            </h2>
            
            <nav className="space-y-1">
              {aiTools.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-2.5 transition-colors ${
                    activeTab === tool.id 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {tool.icon}
                  <span className="text-sm font-medium">{tool.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-9">
          {activeTool && (
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-blue-100">
                  {activeTool.icon}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {activeTool.name}
                </h2>
              </div>
              
              <p className="text-gray-700 mb-6">
                {activeTool.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2">
                    <FaLightbulb className="text-blue-500" /> Key Capabilities
                  </h3>
                  <ul className="space-y-3">
                    {activeTool.capabilities.map((capability, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2">
                    <FaSearch className="text-blue-500" /> Where to Find It
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    {activeTool.location}
                  </p>
                  
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
                    <FaPlay /> Try It Now
                  </button>
                </div>
              </div>
              
              {/* Tool-specific content */}
              {activeTool.id === 'match-engine' && (
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">AI Match Engine</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-blue-600 text-lg font-bold mb-1">95%</div>
                      <div className="text-sm font-medium text-gray-700">David Miller</div>
                      <div className="text-xs text-gray-500">Financial Advisor</div>
                      <div className="mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block">High match</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-blue-600 text-lg font-bold mb-1">92%</div>
                      <div className="text-sm font-medium text-gray-700">Jessica Thompson</div>
                      <div className="text-xs text-gray-500">Estate Attorney</div>
                      <div className="mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block">High match</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-blue-600 text-lg font-bold mb-1">88%</div>
                      <div className="text-sm font-medium text-gray-700">Andrew Clark</div>
                      <div className="text-xs text-gray-500">Insurance Agent</div>
                      <div className="mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block">Good match</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p className="mb-2"><span className="font-medium">Why these matches?</span> Based on your client profile, service offerings, and past successful referrals.</p>
                    <p>The AI Match Engine analyzes over 20 data points to suggest partners most likely to result in successful conversions.</p>
                  </div>
                </div>
              )}
              
              {activeTool.id === 'referral-routing' && (
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">AI Referral Routing</h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700 mb-1">Client: John Smith</div>
                        <div className="text-xs text-gray-500 mb-2">Needs: Tax Planning, Retirement</div>
                        <div className="text-xs text-gray-500">Urgency: High</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Best match:</div>
                        <div className="text-sm font-medium text-blue-600">Sarah Johnson</div>
                        <div className="text-xs text-gray-500">98% success probability</div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-xs text-gray-700"><span className="font-medium">AI Reasoning:</span> Sarah has high conversion rates with similar clients and is currently available. Her tax planning expertise matches client needs.</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>As you enter client details in the referral form, AI Referral Routing automatically suggests the best partners based on expertise, availability, and past success rates.</p>
                  </div>
                </div>
              )}
              
              {activeTool.id === 'chat-assistant' && (
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">AI Chat Assistant</h3>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="bg-blue-600 text-white p-3 text-sm font-medium">AI Assistant</div>
                    <div className="p-4">
                      <div className="flex items-start mb-3">
                        <div className="bg-blue-100 text-blue-800 p-3 rounded-lg rounded-tl-none max-w-[80%] text-sm">
                          <p>Good morning, Alex! I noticed you haven't followed up with John Smith about his tax planning referral. It's been 7 days since your last contact. Would you like me to draft a follow-up email?</p>
                        </div>
                      </div>
                      <div className="flex items-start justify-end mb-3">
                        <div className="bg-gray-100 p-3 rounded-lg rounded-tr-none max-w-[80%] text-sm">
                          <p>Yes, please draft an email. Also, who would be the best person to refer a new client interested in estate planning?</p>
                        </div>
                      </div>
                      <div className="flex items-start mb-3">
                        <div className="bg-blue-100 text-blue-800 p-3 rounded-lg rounded-tl-none max-w-[80%] text-sm">
                          <p>Based on your network and recent success rates, I recommend Jessica Thompson for estate planning. She has a 92% conversion rate with your referrals and specializes in high-net-worth clients. Would you like me to connect you?</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 p-3">
                      <div className="relative">
                        <input type="text" placeholder="Ask your AI assistant..." className="w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2 text-sm" />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTool.id === 'relationship-insights' && (
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">AI Relationship Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Top Performing Relationships</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">Sarah Johnson</div>
                            <div className="text-xs text-gray-500">12 referrals, 92% conversion</div>
                          </div>
                          <div className="w-16 h-2 bg-green-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[92%]"></div>
                          </div>
                        </li>
                        <li className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">Michael Chen</div>
                            <div className="text-xs text-gray-500">8 referrals, 88% conversion</div>
                          </div>
                          <div className="w-16 h-2 bg-green-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[88%]"></div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Relationships Needing Attention</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">David Miller</div>
                            <div className="text-xs text-gray-500">Last contact: 45 days ago</div>
                          </div>
                          <div className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">Dormant</div>
                        </li>
                        <li className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">Emily Rodriguez</div>
                            <div className="text-xs text-gray-500">Last contact: 30 days ago</div>
                          </div>
                          <div className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">At risk</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>AI Relationship Insights analyzes your network connections, communication patterns, and referral outcomes to help you maintain and strengthen valuable professional relationships.</p>
                  </div>
                </div>
              )}
              
              {activeTool.id === 'activity-summarizer' && (
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">AI Activity Summarizer</h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800 mb-1">Meeting with John Smith</div>
                        <div className="text-xs text-gray-500 mb-3">May 5, 2025 • 45 minutes</div>
                        <div className="text-sm text-gray-700 mb-3">
                          <p className="mb-2"><span className="font-medium">AI Summary:</span> Discussed retirement planning options and tax implications of recent inheritance. Client expressed interest in estate planning services.</p>
                          <p className="mb-2"><span className="font-medium">Key Action Items:</span></p>
                          <ul className="list-disc pl-5 space-y-1 text-xs">
                            <li>Send information about tax-advantaged retirement accounts</li>
                            <li>Connect client with estate planning specialist</li>
                            <li>Schedule follow-up meeting in 2 weeks</li>
                          </ul>
                        </div>
                        <div className="text-xs bg-blue-50 text-blue-800 p-2 rounded-lg">
                          <p><span className="font-medium">AI Suggestion:</span> This client is an excellent candidate for a referral to Jessica Thompson for estate planning services.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>AI Activity Summarizer automatically captures and analyzes your client interactions, extracts key information, and suggests appropriate follow-up actions and potential referral opportunities.</p>
                  </div>
                </div>
              )}
              
              {activeTool.id === 'referral-forecasting' && (
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Referral Forecasting</h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm font-medium text-gray-800">30-Day Forecast</div>
                        <div className="text-xs text-gray-500">Based on current activity and historical patterns</div>
                      </div>
                      <div className="text-lg font-bold text-blue-600">12-15 referrals</div>
                    </div>
                    <div className="h-40 mb-3 flex items-end">
                      <div className="flex-1 h-[20%] bg-blue-200 rounded-t-sm mx-0.5 relative group">
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs p-1 rounded whitespace-nowrap">Week 1: 2-3</div>
                      </div>
                      <div className="flex-1 h-[60%] bg-blue-400 rounded-t-sm mx-0.5 relative group">
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs p-1 rounded whitespace-nowrap">Week 2: 4-5</div>
                      </div>
                      <div className="flex-1 h-[40%] bg-blue-300 rounded-t-sm mx-0.5 relative group">
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs p-1 rounded whitespace-nowrap">Week 3: 3-4</div>
                      </div>
                      <div className="flex-1 h-[30%] bg-blue-200 rounded-t-sm mx-0.5 relative group">
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs p-1 rounded whitespace-nowrap">Week 4: 2-3</div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <div>Week 1</div>
                      <div>Week 2</div>
                      <div>Week 3</div>
                      <div>Week 4</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-4">
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div className="text-sm text-blue-800">
                        <p className="font-medium">Insight:</p>
                        <p>You're on track to exceed your monthly goal by 20%. Week 2 is projected to be your highest volume due to seasonal patterns.</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>Referral Forecasting uses advanced time-series models to predict future referral volume and revenue based on your historical data, current activities, and market trends.</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Use Cases */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Common Use Cases
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-md font-medium text-gray-800 mb-2">Finding the Perfect Match</h3>
                <p className="text-sm text-gray-700">
                  Use the AI Match Engine to discover partners who complement your expertise and have high conversion rates with similar clients.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-md font-medium text-gray-800 mb-2">Optimizing Referral Flow</h3>
                <p className="text-sm text-gray-700">
                  Let AI Referral Routing suggest the best partner for each client based on expertise, availability, and past performance.
                </p>
              </div>
            </div>
          </div>
          
          {/* Getting Started */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Getting Started
            </h2>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <p className="text-gray-700 text-sm">
                Our AI tools are designed to enhance your referral process and network growth. Each tool integrates seamlessly with your workflow and learns from your interactions to become more effective over time.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                <FaPlay /> Watch Tutorial
              </button>
              
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
