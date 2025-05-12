import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  FaChartLine, FaChartBar, FaChartPie, FaCalendarAlt, 
  FaUserFriends, FaFilter, FaDownload, FaExchangeAlt,
  FaArrowUp, FaArrowDown, FaEquals
} from 'react-icons/fa';
import Image from 'next/image';

const Statistics = () => {
  // Date range state
  const [dateRange, setDateRange] = useState('last30Days');
  
  // Mock data for statistics
  const overviewStats = [
    { 
      id: 1, 
      label: 'Total Referrals', 
      value: 247, 
      change: 12.4, 
      trend: 'up',
      icon: <FaExchangeAlt className="text-blue-500" />
    },
    { 
      id: 2, 
      label: 'Conversion Rate', 
      value: '68%', 
      change: 3.2, 
      trend: 'up',
      icon: <FaChartLine className="text-green-500" />
    },
    { 
      id: 3, 
      label: 'Avg. Response Time', 
      value: '1.2 days', 
      change: -0.3, 
      trend: 'down',
      icon: <FaCalendarAlt className="text-purple-500" />
    },
    { 
      id: 4, 
      label: 'Revenue Generated', 
      value: '$42,850', 
      change: 8.7, 
      trend: 'up',
      icon: <FaChartBar className="text-indigo-500" />
    }
  ];
  
  // Mock data for referral sources
  const referralSources = [
    { source: 'Direct Network', percentage: 42, count: 104 },
    { source: 'Partner Firms', percentage: 28, count: 69 },
    { source: 'Client Recommendations', percentage: 18, count: 44 },
    { source: 'Website Leads', percentage: 8, count: 20 },
    { source: 'Social Media', percentage: 4, count: 10 }
  ];
  
  // Mock data for service categories
  const serviceCategories = [
    { category: 'Tax Planning', percentage: 35, count: 86 },
    { category: 'Financial Advisory', percentage: 25, count: 62 },
    { category: 'Estate Planning', percentage: 20, count: 49 },
    { category: 'Retirement Planning', percentage: 15, count: 37 },
    { category: 'Insurance Services', percentage: 5, count: 13 }
  ];
  
  // Mock data for conversion funnel
  const conversionFunnel = [
    { stage: 'Referrals Received', count: 247, percentage: 100 },
    { stage: 'Initial Contact', count: 218, percentage: 88 },
    { stage: 'Meeting Scheduled', count: 183, percentage: 74 },
    { stage: 'Proposal Sent', count: 152, percentage: 62 },
    { stage: 'Converted to Client', count: 168, percentage: 68 }
  ];
  
  // Mock data for monthly trends
  const monthlyTrends = [
    { month: 'Jan', referrals: 18, conversions: 12 },
    { month: 'Feb', referrals: 22, conversions: 14 },
    { month: 'Mar', referrals: 25, conversions: 17 },
    { month: 'Apr', referrals: 30, conversions: 21 },
    { month: 'May', referrals: 28, conversions: 19 },
    { month: 'Jun', referrals: 32, conversions: 22 },
    { month: 'Jul', referrals: 35, conversions: 24 },
    { month: 'Aug', referrals: 30, conversions: 20 },
    { month: 'Sep', referrals: 27, conversions: 18 },
    { month: 'Oct', referrals: 33, conversions: 23 },
    { month: 'Nov', referrals: 38, conversions: 26 },
    { month: 'Dec', referrals: 42, conversions: 29 }
  ];
  
  // Helper function to render trend icon
  const renderTrendIcon = (trend: string) => {
    if (trend === 'up') {
      return <FaArrowUp className="text-green-500" />;
    } else if (trend === 'down') {
      return <FaArrowDown className="text-red-500" />;
    } else {
      return <FaEquals className="text-gray-500" />;
    }
  };

  return (
    <Layout>
      {/* Hero Image */}
      <div className="relative w-full overflow-hidden h-[180px] rounded-lg">
        <Image 
          src="/images/hero.png" 
          alt="Statistics Hero" 
          width={1920}
          height={225}
          className="w-full h-full object-fill brightness-110 contrast-110 saturate-125"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-overlay"></div>
        
        {/* Content Overlay with Dark Text and Semi-Transparent Background - Top Center */}
        <div className="absolute inset-x-0 top-4 flex justify-center">
          <div className="text-center px-6 py-2 bg-white/5 backdrop-blur-sm rounded-lg">
            <h1 className="text-xl font-bold tracking-tight text-gray-800 drop-shadow-md">Statistics Dashboard</h1>
            <p className="text-sm text-gray-700 max-w-2xl drop-shadow-md">Track your referral performance metrics</p>
          </div>
        </div>
      </div>
      
      {/* Controls and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4 mt-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Date Range:</span>
            <select 
              className="border border-gray-300 rounded-md text-sm px-3 py-1.5"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="last7Days">Last 7 Days</option>
              <option value="last30Days">Last 30 Days</option>
              <option value="last90Days">Last 90 Days</option>
              <option value="lastYear">Last Year</option>
              <option value="allTime">All Time</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm transition-colors">
              <FaFilter size={12} />
              Filters
            </button>
            <button className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md text-sm transition-colors">
              <FaDownload size={12} />
              Export
            </button>
          </div>
        </div>
      </div>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {overviewStats.map(stat => (
          <div key={stat.id} className="bg-white rounded-xl shadow-lg p-4 border-t-4 border-blue-500 relative overflow-hidden">
            {/* Background SVG Pattern */}
            <div className="absolute right-0 bottom-0 opacity-5">
              {stat.id === 1 && (
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM80 55H55V80H45V55H20V45H45V20H55V45H80V55Z" fill="currentColor"/>
                </svg>
              )}
              {stat.id === 2 && (
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M90 0H10C4.5 0 0 4.5 0 10V90C0 95.5 4.5 100 10 100H90C95.5 100 100 95.5 100 90V10C100 4.5 95.5 0 90 0ZM80 70C80 75.5 75.5 80 70 80H30C24.5 80 20 75.5 20 70V60H30V70H70V30H30V40H20V30C20 24.5 24.5 20 30 20H70C75.5 20 80 24.5 80 30V70ZM20 50H35V60H20V50ZM40 50H55V60H40V50Z" fill="currentColor"/>
                </svg>
              )}
              {stat.id === 3 && (
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM50 90C27.9 90 10 72.1 10 50C10 27.9 27.9 10 50 10C72.1 10 90 27.9 90 50C90 72.1 72.1 90 50 90ZM70 45H55V25H45V55H70V45Z" fill="currentColor"/>
                </svg>
              )}
              {stat.id === 4 && (
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM55 85H45V75H55V85ZM67.5 42.5L62.5 47.5C57.5 52.5 55 55 55 65H45V62.5C45 55 47.5 50 52.5 45L59.5 38C61.3 36.3 62.5 33.8 62.5 31C62.5 25.5 58 21 52.5 21C47 21 42.5 25.5 42.5 31H32.5C32.5 20 41.5 11 52.5 11C63.5 11 72.5 20 72.5 31C72.5 35.5 70.5 39.5 67.5 42.5Z" fill="currentColor"/>
                </svg>
              )}
            </div>
            
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                {stat.icon}
              </div>
            </div>
            
            <div className="mt-3 flex items-center text-sm relative z-10">
              <span className={`flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {renderTrendIcon(stat.trend)}
                {Math.abs(stat.change)}%
              </span>
              <span className="text-gray-500 ml-2">vs. previous period</span>
            </div>
            
            {/* Mini Sparkline Chart */}
            <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20">
              {stat.trend === 'up' && (
                <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 L10,12 L20,13 L30,10 L40,11 L50,8 L60,9 L70,6 L80,5 L90,2 L100,0" stroke="#10B981" strokeWidth="2" fill="none" />
                </svg>
              )}
              {stat.trend === 'down' && (
                <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,5 L10,6 L20,8 L30,7 L40,10 L50,9 L60,12 L70,11 L80,14 L90,13 L100,15" stroke="#EF4444" strokeWidth="2" fill="none" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Referral Sources */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Referral Sources</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
          </div>
          
          <div className="space-y-4">
            {referralSources.map((source, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{source.source}</span>
                  <span className="text-gray-600">{source.percentage}% ({source.count})</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Service Categories */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Service Categories</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
          </div>
          
          <div className="space-y-4">
            {serviceCategories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{category.category}</span>
                  <span className="text-gray-600">{category.percentage}% ({category.count})</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full" 
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Conversion Funnel */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Conversion Funnel</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {conversionFunnel.map((stage, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-full h-24 bg-gradient-to-t from-blue-600 to-indigo-600 rounded-t-lg flex items-end justify-center"
                style={{ height: `${(stage.percentage / 100) * 150}px` }}
              >
                <span className="text-white font-bold mb-2">{stage.percentage}%</span>
              </div>
              <div className="bg-gray-100 p-2 w-full rounded-b-lg text-center">
                <p className="text-xs font-medium text-gray-700">{stage.stage}</p>
                <p className="text-xs text-gray-500">{stage.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Monthly Trends */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Monthly Trends</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Referrals</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Conversions</span>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
          </div>
        </div>
        
        <div className="h-80 w-full relative">
          {/* SVG Chart */}
          <svg width="100%" height="100%" viewBox="0 0 1200 400" preserveAspectRatio="none">
            {/* Background Grid */}
            <defs>
              <pattern id="monthlyGrid" width="100" height="80" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 80" fill="none" stroke="#E5E7EB" strokeWidth="1" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="320" fill="url(#monthlyGrid)" />
            
            {/* Horizontal Guide Lines */}
            <line x1="0" y1="80" x2="1200" y2="80" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="0" y1="160" x2="1200" y2="160" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="0" y1="240" x2="1200" y2="240" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5,5" />
            <line x1="0" y1="320" x2="1200" y2="320" stroke="#E5E7EB" strokeWidth="1" />
            
            {/* Y-Axis Labels */}
            <text x="10" y="80" fontSize="12" fill="#6B7280" textAnchor="start" dominantBaseline="middle">30</text>
            <text x="10" y="160" fontSize="12" fill="#6B7280" textAnchor="start" dominantBaseline="middle">20</text>
            <text x="10" y="240" fontSize="12" fill="#6B7280" textAnchor="start" dominantBaseline="middle">10</text>
            <text x="10" y="320" fontSize="12" fill="#6B7280" textAnchor="start" dominantBaseline="middle">0</text>
            
            {/* Area Charts */}
            <defs>
              <linearGradient id="referralGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="conversionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Referrals Area */}
            <path 
              d={`M 50,${320 - monthlyTrends[0].referrals * 8} 
                 L 150,${320 - monthlyTrends[1].referrals * 8} 
                 L 250,${320 - monthlyTrends[2].referrals * 8} 
                 L 350,${320 - monthlyTrends[3].referrals * 8} 
                 L 450,${320 - monthlyTrends[4].referrals * 8} 
                 L 550,${320 - monthlyTrends[5].referrals * 8} 
                 L 650,${320 - monthlyTrends[6].referrals * 8} 
                 L 750,${320 - monthlyTrends[7].referrals * 8} 
                 L 850,${320 - monthlyTrends[8].referrals * 8} 
                 L 950,${320 - monthlyTrends[9].referrals * 8} 
                 L 1050,${320 - monthlyTrends[10].referrals * 8} 
                 L 1150,${320 - monthlyTrends[11].referrals * 8} 
                 L 1150,320 L 50,320 Z`} 
              fill="url(#referralGradient)" 
              opacity="0.8"
            />
            
            {/* Conversions Area */}
            <path 
              d={`M 50,${320 - monthlyTrends[0].conversions * 8} 
                 L 150,${320 - monthlyTrends[1].conversions * 8} 
                 L 250,${320 - monthlyTrends[2].conversions * 8} 
                 L 350,${320 - monthlyTrends[3].conversions * 8} 
                 L 450,${320 - monthlyTrends[4].conversions * 8} 
                 L 550,${320 - monthlyTrends[5].conversions * 8} 
                 L 650,${320 - monthlyTrends[6].conversions * 8} 
                 L 750,${320 - monthlyTrends[7].conversions * 8} 
                 L 850,${320 - monthlyTrends[8].conversions * 8} 
                 L 950,${320 - monthlyTrends[9].conversions * 8} 
                 L 1050,${320 - monthlyTrends[10].conversions * 8} 
                 L 1150,${320 - monthlyTrends[11].conversions * 8} 
                 L 1150,320 L 50,320 Z`} 
              fill="url(#conversionGradient)" 
              opacity="0.6"
            />
            
            {/* Referrals Line */}
            <path 
              d={`M 50,${320 - monthlyTrends[0].referrals * 8} 
                 L 150,${320 - monthlyTrends[1].referrals * 8} 
                 L 250,${320 - monthlyTrends[2].referrals * 8} 
                 L 350,${320 - monthlyTrends[3].referrals * 8} 
                 L 450,${320 - monthlyTrends[4].referrals * 8} 
                 L 550,${320 - monthlyTrends[5].referrals * 8} 
                 L 650,${320 - monthlyTrends[6].referrals * 8} 
                 L 750,${320 - monthlyTrends[7].referrals * 8} 
                 L 850,${320 - monthlyTrends[8].referrals * 8} 
                 L 950,${320 - monthlyTrends[9].referrals * 8} 
                 L 1050,${320 - monthlyTrends[10].referrals * 8} 
                 L 1150,${320 - monthlyTrends[11].referrals * 8}`} 
              fill="none" 
              stroke="#3B82F6" 
              strokeWidth="2"
            />
            
            {/* Conversions Line */}
            <path 
              d={`M 50,${320 - monthlyTrends[0].conversions * 8} 
                 L 150,${320 - monthlyTrends[1].conversions * 8} 
                 L 250,${320 - monthlyTrends[2].conversions * 8} 
                 L 350,${320 - monthlyTrends[3].conversions * 8} 
                 L 450,${320 - monthlyTrends[4].conversions * 8} 
                 L 550,${320 - monthlyTrends[5].conversions * 8} 
                 L 650,${320 - monthlyTrends[6].conversions * 8} 
                 L 750,${320 - monthlyTrends[7].conversions * 8} 
                 L 850,${320 - monthlyTrends[8].conversions * 8} 
                 L 950,${320 - monthlyTrends[9].conversions * 8} 
                 L 1050,${320 - monthlyTrends[10].conversions * 8} 
                 L 1150,${320 - monthlyTrends[11].conversions * 8}`} 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="2"
            />
            
            {/* Data Points - Referrals */}
            {monthlyTrends.map((month, index) => (
              <circle 
                key={`referral-${index}`}
                cx={50 + (index * 100)} 
                cy={320 - month.referrals * 8} 
                r="5" 
                fill="#3B82F6"
              />
            ))}
            
            {/* Data Points - Conversions */}
            {monthlyTrends.map((month, index) => (
              <circle 
                key={`conversion-${index}`}
                cx={50 + (index * 100)} 
                cy={320 - month.conversions * 8} 
                r="5" 
                fill="#10B981"
              />
            ))}
            
            {/* X-Axis Labels */}
            {monthlyTrends.map((month, index) => (
              <text 
                key={`month-${index}`}
                x={50 + (index * 100)} 
                y="350" 
                fontSize="12" 
                fill="#6B7280" 
                textAnchor="middle"
              >
                {month.month}
              </text>
            ))}
          </svg>
          
          {/* Hover Tooltip - Would be implemented with JavaScript in a real app */}
          <div className="absolute top-4 right-4 bg-white/90 border border-gray-200 rounded-lg p-3 shadow-md hidden">
            <p className="text-sm font-medium text-gray-800">November 2024</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <p className="text-xs text-gray-600">Referrals: <span className="font-medium">38</span></p>
            </div>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <p className="text-xs text-gray-600">Conversions: <span className="font-medium">26</span></p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Insights and Recommendations */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">AI Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
            <h3 className="text-md font-semibold text-blue-800 mb-2">Conversion Opportunity</h3>
            <p className="text-sm text-gray-700">Your tax planning referrals convert 15% higher than other services. Consider focusing your network growth in this area.</p>
          </div>
          
          <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
            <h3 className="text-md font-semibold text-purple-800 mb-2">Response Time Impact</h3>
            <p className="text-sm text-gray-700">Referrals contacted within 24 hours have a 32% higher conversion rate. Try to reduce your average response time.</p>
          </div>
          
          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
            <h3 className="text-md font-semibold text-green-800 mb-2">Network Expansion</h3>
            <p className="text-sm text-gray-700">Partner firm referrals increased by 28% this quarter. Continue building relationships with complementary service providers.</p>
          </div>
          
          <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
            <h3 className="text-md font-semibold text-orange-800 mb-2">Seasonal Trend</h3>
            <p className="text-sm text-gray-700">Your Q4 referrals historically increase by 35%. Prepare capacity now to handle the upcoming seasonal increase.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Statistics;
