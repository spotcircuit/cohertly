import { useState, useEffect } from 'react';
import { 
  FaChartLine, FaUserFriends, FaHandshake, FaBell, FaEnvelope, 
  FaHome, FaCog, FaSignOutAlt, FaSearch, FaPlus, FaChevronRight,
  FaCalendarAlt, FaChartBar, FaLightbulb, FaStar, FaArrowUp, FaArrowDown,
  FaUser, FaFlask, FaNetworkWired
} from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Dashboard() {
  // State for showing v2 banner
  const [showV2Banner, setShowV2Banner] = useState(false);
  
  // Check if we're in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setShowV2Banner(true);
    }
  }, []);
  
  // Add CSS for glass button styling
  const glassButtonStyle = `
    .btn-glass {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(5px);
      border-radius: 0.375rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
    }
    
    .btn-glass:hover {
      background: rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }
  `;
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for dashboard
  const metrics = [
    { id: 1, name: 'Total Referrals', value: 124, change: 12, isPositive: true },
    { id: 2, name: 'Conversion Rate', value: '32%', change: 5, isPositive: true },
    { id: 3, name: 'New Connections', value: 28, change: 3, isPositive: true },
    { id: 4, name: 'Revenue Generated', value: '$2,450', change: 8, isPositive: true },
  ];

  const recentActivity = [
    { id: 1, type: 'referral', name: 'Sarah Johnson', action: 'accepted your referral', time: '2 hours ago', avatar: 'SJ' },
    { id: 2, type: 'match', name: 'AI Match Engine', action: 'found 3 new matches for you', time: '4 hours ago', avatar: 'AI' },
    { id: 3, type: 'referral', name: 'Michael Chen', action: 'sent you a referral', time: '1 day ago', avatar: 'MC' },
    { id: 4, type: 'connection', name: 'Lisa Rodriguez', action: 'connected with you', time: '2 days ago', avatar: 'LR' },
  ];

  const upcomingMeetings = [
    { id: 1, title: 'Intro Call with David Miller', date: 'Today, 3:00 PM', type: 'Virtual' },
    { id: 2, title: 'Follow-up with Sarah Johnson', date: 'Tomorrow, 11:00 AM', type: 'In-person' },
    { id: 3, title: 'Quarterly Review', date: 'May 10, 2:30 PM', type: 'Virtual' },
  ];

  const pendingReferrals = [
    { id: 1, client: 'Robert Smith', service: 'Tax Planning', status: 'Pending', daysAgo: 2 },
    { id: 2, client: 'Jennifer Lee', service: 'Estate Planning', status: 'Pending', daysAgo: 1 },
    { id: 3, client: 'Mark Wilson', service: 'Retirement Planning', status: 'Pending', daysAgo: 3 },
  ];

  const topMatches = [
    { id: 1, name: 'David Miller', profession: 'Financial Advisor', matchScore: 95, avatar: 'DM' },
    { id: 2, name: 'Jessica Thompson', profession: 'Estate Attorney', matchScore: 92, avatar: 'JT' },
    { id: 3, name: 'Andrew Clark', profession: 'Insurance Agent', matchScore: 88, avatar: 'AC' },
  ];

  return (
    <Layout>
      {/* V2 Feature Banner - Only shows in development */}
      {showV2Banner && (
        <div className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaFlask className="text-xl mr-2" />
              <div>
                <h3 className="font-bold">V2 Features Available</h3>
                <p className="text-sm opacity-90">You're viewing the development branch with v2 features</p>
              </div>
            </div>
            <Link href="/v2/network" className="flex items-center bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
              <FaNetworkWired className="mr-2" />
              <span>Try Network Visualization</span>
            </Link>
          </div>
        </div>
      )}
      
      {/* Hero Image with Adjusted Height */}
      <div className="relative w-full overflow-hidden h-[180px] rounded-lg">
        <Image 
          src="/images/hero.png" 
          alt="Dashboard Hero" 
          width={1920}
          height={225}
          className="w-full h-full object-fill brightness-110 contrast-110 saturate-125"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-overlay"></div>
        
        {/* Content Overlay with Dark Text and Semi-Transparent Background - Bottom Center */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <div className="text-center px-6 py-2 bg-white/5 backdrop-blur-sm rounded-t-lg">
            <h1 className="text-xl font-bold tracking-tight text-gray-800 drop-shadow-md">Welcome to Cohertly</h1>
            <p className="text-sm text-gray-700 max-w-2xl drop-shadow-md">Your professional network management platform</p>
          </div>
        </div>
      </div>
      
      {/* Small padding between hero and content */}
      <div className="h-2"></div>
      
      {/* Apply custom CSS styles */}
      <style jsx global>{glassButtonStyle}</style>
      

      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex relative">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-gradient-to-b from-blue-900 to-purple-900 h-auto shadow-lg rounded-lg">
          <div className="p-3 border-b border-blue-700">
            <Link href="/dashboard" className="flex items-center gap-1 text-base font-bold text-white">
              <FaChartLine className="text-blue-300 text-sm" /> Pro Network
            </Link>
          </div>
          
          <nav className="p-3">
            {/* Main Navigation Section with Background */}
            <div className="mb-5 rounded-lg bg-indigo-900 p-3 border border-indigo-600 shadow-md">
              <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">Main</p>
              <ul className="space-y-1.5">
                <li>
                  <button 
                    onClick={() => setActiveTab('overview')} 
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left ${activeTab === 'overview' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}
                  >
                    <FaHome /> Dashboard
                  </button>
                </li>
                <li>
                  <Link href="/referrals" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-blue-100 hover:bg-blue-800">
                    <FaUserFriends /> Referrals
                  </Link>
                </li>
                <li>
                  <Link href="/ai-tools" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-blue-100 hover:bg-blue-800">
                    <FaLightbulb /> AI Tools
                  </Link>
                </li>
                <li>
                  <Link href="/matches" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-blue-100 hover:bg-blue-800">
                    <FaHandshake /> Matches
                  </Link>
                </li>
                <li>
                  <Link href="/calendar" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-blue-100 hover:bg-blue-800">
                    <FaCalendarAlt /> Calendar
                  </Link>
                </li>

              </ul>
            </div>
            
            {/* Analytics Section with Background */}
            <div className="mb-5 rounded-lg bg-purple-900 p-3 border border-purple-600 shadow-md">
              <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">Analytics</p>
              <ul className="space-y-1.5">
                <li>
                  <Link 
                    href="/statistics" 
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-blue-100 hover:bg-blue-800"
                  >
                    <FaChartBar /> Statistics
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/reports" 
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-blue-100 hover:bg-blue-800"
                  >
                    <FaChartLine /> Reports
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Account Section with Background */}
            <div className="mb-5 rounded-lg bg-blue-900 p-3 border border-blue-500 shadow-md">
              <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">Account</p>
              <ul className="space-y-1.5">
                <li>
                  <Link 
                    href="/settings" 
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-blue-100 hover:bg-blue-800"
                  >
                    <FaCog /> Settings
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/profile" 
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-blue-100 hover:bg-blue-800"
                  >
                    <FaUser /> Profile
                  </Link>
                </li>
                <li>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-red-300 hover:bg-blue-800">
                    <FaSignOutAlt /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
            
            {/* AI Insights - Moved below navigation */}
            <div className="mt-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 overflow-hidden relative">
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white opacity-10 rounded-full"></div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-yellow-400 bg-opacity-20 rounded-full">
                  <FaLightbulb className="text-yellow-300 text-sm" />
                </div>
                <h3 className="text-base font-semibold">AI Insights</h3>
              </div>
              
              <div className="space-y-3 mb-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="mt-1 text-yellow-300 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Referral rate <span className="font-bold text-yellow-300">15% higher</span> with 24h follow-up</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="mt-1 text-yellow-300 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p><span className="font-bold text-yellow-300">Financial services</span> most active this month</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-1 rounded transition-colors flex items-center gap-1">
                  View All
                  <FaChevronRight className="text-xs" />
                </button>
                <div className="text-blue-200">Updated 2h ago</div>
              </div>
            </div>
            
            {/* Network Growth - Moved below navigation */}
            <div className="mt-4 rounded-lg p-4 shadow-md overflow-hidden relative bg-gradient-to-br from-green-500 to-teal-600 text-white">
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white opacity-10 rounded-full"></div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-green-400 bg-opacity-20 rounded-full">
                  <FaChartBar className="text-green-200 text-sm" />
                </div>
                <h3 className="text-base font-semibold">Network Growth</h3>
              </div>
              
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-white">New Connections</div>
                    <div className="flex items-center text-green-200 font-medium">
                      <FaArrowUp className="mr-1 text-xs" /> 24%
                    </div>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                    <div className="bg-white h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-white">Referral Quality</div>
                    <div className="flex items-center text-green-200 font-medium">
                      <FaArrowUp className="mr-1 text-xs" /> 12%
                    </div>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                    <div className="bg-white h-1.5 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-white">Engagement</div>
                    <div className="flex items-center text-red-200 font-medium">
                      <FaArrowDown className="mr-1 text-xs" /> 3%
                    </div>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                    <div className="bg-white h-1.5 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs mt-3">
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-1 rounded transition-colors flex items-center gap-1">
                  View Analytics
                  <FaChevronRight className="text-xs" />
                </button>
                <div className="text-green-200">Updated 3h ago</div>
              </div>
            </div>
            
            {/* Referral Stats - Moved to sidebar */}
            <div className="mt-3 rounded-lg p-4 shadow-md overflow-hidden relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white opacity-10 rounded-full"></div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-blue-400 bg-opacity-20 rounded-full">
                  <FaUserFriends className="text-blue-200 text-sm" />
                </div>
                <h3 className="text-base font-semibold">Referral Stats</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-200" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs">Completed</p>
                      <p className="text-sm font-bold text-white">24</p>
                    </div>
                  </div>
                  <div className="text-green-200 text-xs">+18%</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-200" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs">Pending</p>
                      <p className="text-sm font-bold text-white">12</p>
                    </div>
                  </div>
                  <div className="text-yellow-200 text-xs">+5%</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-200" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs">Declined</p>
                      <p className="text-sm font-bold text-white">3</p>
                    </div>
                  </div>
                  <div className="text-red-200 text-xs">-2%</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs mt-3">
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-1 rounded transition-colors flex items-center gap-1">
                  View Details
                  <FaChevronRight className="text-xs" />
                </button>
                <div className="text-blue-200">Updated 1h ago</div>
              </div>
            </div>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 pt-0 pr-8 pb-8 pl-4 bg-gradient-to-r from-white via-yellow-50 to-yellow-100">
          {/* Top Navigation Bar */}
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg p-6 mb-8 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>
            
            <div className="flex justify-between items-center relative z-10">
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-blue-100 text-sm mt-1">Welcome back, Alex! Here's what's happening today.</p>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
                  <FaBell />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                
                <button className="relative p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
                  <FaEnvelope />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-indigo-700 text-sm font-bold shadow-md">
                  AJ
                </div>
              </div>
            </div>
          </div>
          
          {/* Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {metrics.map((metric, index) => (
              <div 
                key={metric.id} 
                className={`rounded-xl shadow-lg p-4 flex flex-col ${index === 0 ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500' : 
                                                                   index === 1 ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500' : 
                                                                   index === 2 ? 'bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500' : 
                                                                   'bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-yellow-500'}`}
              >
                <div className="text-gray-700 text-xs font-medium mb-1">{metric.name}</div>
                <div className="text-2xl font-bold mb-1 truncate">{metric.value}</div>
                <div className={`flex items-center text-xs font-medium px-2 py-0.5 rounded-full inline-block w-fit ${metric.isPositive ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>
                  {metric.isPositive ? <FaArrowUp className="mr-1 text-xs" /> : <FaArrowDown className="mr-1 text-xs" />}
                  {metric.change}%
                </div>
              </div>
            ))}
          </div>
          
          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-blue-800">Recent Activity</h2>
                  <button className="text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                    View All <FaChevronRight className="text-xs" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={activity.id} 
                      className={`flex items-start p-4 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-purple-50'} hover:shadow-md rounded-lg transition-all border-l-4 ${activity.type === 'match' ? 'border-purple-500' : activity.type === 'referral' ? 'border-blue-500' : 'border-green-500'}`}
                    >
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-medium mr-3 shadow-md ${activity.type === 'match' ? 'bg-gradient-to-br from-purple-500 to-purple-700' : activity.type === 'referral' ? 'bg-gradient-to-br from-blue-500 to-blue-700' : 'bg-gradient-to-br from-green-500 to-green-700'}`}>
                        {activity.avatar}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate font-medium text-gray-800">
                          <span className="font-bold">{activity.name}</span> {activity.action}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <FaCalendarAlt className="text-xs text-blue-500" /> {activity.time}
                        </p>
                      </div>
                      <button className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-white transition-all">
                        <FaChevronRight />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Top AI Matches - Moved from right column */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6 overflow-hidden relative">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full -mr-20 -mt-20 opacity-50"></div>
                
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <h2 className="text-lg font-semibold text-purple-800 flex items-center gap-2">
                    <FaLightbulb className="text-yellow-500" /> Top AI Matches
                  </h2>
                  <Link href="/matches" className="text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                    View All <FaChevronRight className="text-xs" />
                  </Link>
                </div>
                
                <div className="space-y-3 relative z-10">
                  {topMatches.map((match, index) => (
                    <div 
                      key={match.id} 
                      className={`p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-indigo-50'} rounded-lg hover:shadow-md transition-all relative overflow-hidden border border-purple-100`}
                    >
                      {/* Match score indicator */}
                      <div className="absolute top-0 right-0 w-16 h-16">
                        <div className="absolute transform rotate-45 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold py-1 right-[-35px] top-[12px] w-[100px] text-center shadow-sm">
                          {match.matchScore}% Match
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium mr-4 shadow-md text-lg">
                          {match.avatar}
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="font-medium text-lg text-gray-800 truncate">{match.name}</h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 whitespace-nowrap">
                              {match.profession}
                            </span>
                            <div className="flex items-center">
                              {Array.from({length: Math.floor(match.matchScore/20)}).map((_, i) => (
                                <FaStar key={i} className="text-amber-500 text-sm" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm px-3 py-2 rounded-lg flex items-center gap-1 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                            Connect
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* AI Explanation */}
                <div className="mt-4 p-4 bg-purple-100 rounded-lg border border-purple-200 flex items-start">
                  <div className="text-purple-600 mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                  </div>
                  <div className="text-sm text-purple-900">
                    <p className="font-bold">AI Match Insight</p>
                    <p>These matches are based on complementary services, client needs, and professional background compatibility.</p>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Meetings */}
              <div className="rounded-xl shadow-lg p-6 overflow-hidden relative bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                {/* Decorative elements */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-white opacity-10 rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white opacity-5 rounded-full"></div>
                
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <div className="p-1.5 bg-blue-400 bg-opacity-20 rounded-full">
                      <FaCalendarAlt className="text-blue-100" />
                    </div>
                    Upcoming Meetings
                  </h2>
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-sm flex items-center gap-1 px-3 py-1.5 rounded transition-colors">
                    <FaPlus className="text-xs" /> Add Meeting
                  </button>
                </div>
                
                <div className="space-y-3 relative z-10">
                  {upcomingMeetings.map((meeting, index) => (
                    <div 
                      key={meeting.id} 
                      className={`p-4 rounded-lg hover:bg-opacity-30 transition-all border-l-4 backdrop-blur-sm
                        ${index === 0 ? 'bg-purple-500 bg-opacity-30 border-purple-300' : 
                          index === 1 ? 'bg-indigo-500 bg-opacity-30 border-indigo-300' : 
                          'bg-blue-500 bg-opacity-30 border-blue-300'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white text-lg">{meeting.title}</h3>
                          <p className="text-sm text-blue-100 mt-1 flex items-center gap-1">
                            <FaCalendarAlt className="text-xs text-blue-200" /> {meeting.date}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${meeting.type === 'Virtual' ? 'bg-blue-600 bg-opacity-30 text-blue-100 border border-blue-400 border-opacity-30' : 'bg-green-600 bg-opacity-30 text-green-100 border border-green-400 border-opacity-30'}`}>
                            {meeting.type}
                          </span>
                          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                            Join
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-8">
              {/* Pending Referrals */}
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-4 overflow-hidden">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-base font-semibold text-blue-800">Pending Referrals</h2>
                  <Link href="/referrals" className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded-lg transition-colors flex items-center gap-1">
                    View All <FaChevronRight className="text-xs" />
                  </Link>
                </div>
                
                <div className="space-y-2">
                  {pendingReferrals.map((referral, index) => (
                    <div 
                      key={referral.id} 
                      className={`p-2 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} rounded-lg hover:shadow-md transition-all relative overflow-hidden border border-blue-100`}
                    >
                      {/* Days indicator */}
                      <div className="absolute top-0 right-0 w-12 h-12">
                        <div className="absolute transform rotate-45 bg-yellow-500 text-white text-[10px] font-bold py-0.5 right-[-30px] top-[8px] w-[80px] text-center">
                          {referral.daysAgo}d old
                        </div>
                      </div>

                      <h3 className="font-medium text-sm text-gray-800 pr-12">{referral.client}</h3>
                      <div className="flex items-center flex-wrap gap-1 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">
                          {referral.service}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1 whitespace-nowrap">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {referral.status}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs px-2 py-1 rounded-lg flex items-center gap-1 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Follow up
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Feedback element */}
                <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200 flex items-start">
                  <div className="text-blue-600 mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-xs text-blue-900">
                    <p className="font-bold">Pro Tip</p>
                    <p>Following up within 48 hours increases your referral conversion rate by 35%.</p>
                  </div>
                </div>
              </div>
              
              {/* Professional Growth Insights */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h2 className="text-base font-semibold text-gray-800 mb-3">Growth Insights</h2>
                
                <div className="space-y-3">
                  <div className="p-2 border-l-2 border-green-500 bg-green-50 rounded-r-lg">
                    <h3 className="text-xs font-semibold text-green-800">Network Expansion</h3>
                    <p className="text-xs text-gray-600 mt-1">Your network grew by 15% this month. Continue connecting with professionals in financial services.</p>
                  </div>
                  
                  <div className="p-2 border-l-2 border-blue-500 bg-blue-50 rounded-r-lg">
                    <h3 className="text-xs font-semibold text-blue-800">Skill Development</h3>
                    <p className="text-xs text-gray-600 mt-1">Consider adding "Tax Planning" to your skills - it's highly requested in your network.</p>
                  </div>
                  
                  <div className="p-2 border-l-2 border-purple-500 bg-purple-50 rounded-r-lg">
                    <h3 className="text-xs font-semibold text-purple-800">Engagement Opportunity</h3>
                    <p className="text-xs text-gray-600 mt-1">5 connections haven't been contacted in 30+ days. Consider reaching out.</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-1.5 rounded-lg transition-colors text-xs font-medium">
                    View All Insights
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}