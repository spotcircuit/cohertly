import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  FaFileAlt, FaDownload, FaCalendarAlt, FaFilter, 
  FaChartLine, FaUserFriends, FaBuilding, FaMoneyBillWave,
  FaSearch, FaEye, FaShareAlt, FaStar, FaLightbulb
} from 'react-icons/fa';
import Image from 'next/image';

const Reports = () => {
  // State for report filters
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('lastMonth');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for available reports
  const reports = [
    {
      id: 1,
      title: 'Monthly Referral Performance',
      description: 'Comprehensive analysis of referral volume, conversion rates, and revenue generated',
      type: 'performance',
      date: 'May 1, 2025',
      views: 42,
      starred: true,
      thumbnail: '/images/chart-thumbnail.png'
    },
    {
      id: 2,
      title: 'Network Growth Analysis',
      description: 'Detailed breakdown of network expansion, new connections, and relationship strength',
      type: 'network',
      date: 'April 28, 2025',
      views: 38,
      starred: false,
      thumbnail: '/images/chart-thumbnail.png'
    },
    {
      id: 3,
      title: 'Revenue Attribution Report',
      description: 'Analysis of revenue generated through referrals by source, service type, and partner',
      type: 'financial',
      date: 'April 25, 2025',
      views: 56,
      starred: true,
      thumbnail: '/images/chart-thumbnail.png'
    },
    {
      id: 4,
      title: 'Conversion Funnel Analysis',
      description: 'Detailed breakdown of referral journey stages and conversion optimization opportunities',
      type: 'performance',
      date: 'April 20, 2025',
      views: 31,
      starred: false,
      thumbnail: '/images/chart-thumbnail.png'
    },
    {
      id: 5,
      title: 'Partner Performance Comparison',
      description: 'Side-by-side analysis of referral partners, highlighting top performers and growth opportunities',
      type: 'network',
      date: 'April 15, 2025',
      views: 47,
      starred: true,
      thumbnail: '/images/chart-thumbnail.png'
    },
    {
      id: 6,
      title: 'Service Category Analysis',
      description: 'Breakdown of referrals by service category, including conversion rates and average value',
      type: 'performance',
      date: 'April 10, 2025',
      views: 29,
      starred: false,
      thumbnail: '/images/chart-thumbnail.png'
    },
    {
      id: 7,
      title: 'Quarterly Financial Impact',
      description: 'Comprehensive financial analysis of referral program ROI and revenue contribution',
      type: 'financial',
      date: 'April 5, 2025',
      views: 63,
      starred: true,
      thumbnail: '/images/chart-thumbnail.png'
    },
    {
      id: 8,
      title: 'Response Time Optimization',
      description: 'Analysis of response times and their impact on conversion rates and client satisfaction',
      type: 'performance',
      date: 'April 1, 2025',
      views: 34,
      starred: false,
      thumbnail: '/images/chart-thumbnail.png'
    }
  ];
  
  // Filter reports based on selected filters and search query
  const filteredReports = reports.filter(report => {
    // Filter by type
    if (reportType !== 'all' && report.type !== reportType) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !report.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !report.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Helper function to get icon based on report type
  const getReportIcon = (type: string) => {
    switch(type) {
      case 'performance':
        return <FaChartLine className="text-blue-500" />;
      case 'network':
        return <FaUserFriends className="text-purple-500" />;
      case 'financial':
        return <FaMoneyBillWave className="text-green-500" />;
      default:
        return <FaFileAlt className="text-gray-500" />;
    }
  };
  
  // Helper function to get type label
  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'performance':
        return 'Performance';
      case 'network':
        return 'Network';
      case 'financial':
        return 'Financial';
      default:
        return 'Other';
    }
  };
  
  // Mock scheduled reports
  const scheduledReports = [
    {
      id: 101,
      title: 'Weekly Performance Summary',
      frequency: 'Weekly',
      nextDelivery: 'May 10, 2025',
      recipients: 3
    },
    {
      id: 102,
      title: 'Monthly Financial Impact',
      frequency: 'Monthly',
      nextDelivery: 'June 1, 2025',
      recipients: 5
    },
    {
      id: 103,
      title: 'Quarterly Network Growth',
      frequency: 'Quarterly',
      nextDelivery: 'July 1, 2025',
      recipients: 2
    }
  ];

  return (
    <Layout>
      {/* Hero Image */}
      <div className="relative w-full overflow-hidden h-[180px] rounded-lg">
        <Image 
          src="/images/hero.png" 
          alt="Reports Hero" 
          width={1920}
          height={225}
          className="w-full h-full object-fill brightness-110 contrast-110 saturate-125"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-overlay"></div>
        
        {/* Content Overlay with Dark Text and Semi-Transparent Background - Top Center */}
        <div className="absolute inset-x-0 top-4 flex justify-center">
          <div className="text-center px-6 py-2 bg-white/5 backdrop-blur-sm rounded-lg">
            <h1 className="text-xl font-bold tracking-tight text-gray-800 drop-shadow-md">Reports Center</h1>
            <p className="text-sm text-gray-700 max-w-2xl drop-shadow-md">Access and manage your referral reports</p>
          </div>
        </div>
      </div>
      
      {/* Controls and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4 mt-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" size={14} />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <select 
              className="border border-gray-300 rounded-md text-sm px-3 py-2"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="all">All Report Types</option>
              <option value="performance">Performance</option>
              <option value="network">Network</option>
              <option value="financial">Financial</option>
            </select>
            
            <select 
              className="border border-gray-300 rounded-md text-sm px-3 py-2"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastQuarter">Last Quarter</option>
              <option value="lastYear">Last Year</option>
              <option value="allTime">All Time</option>
            </select>
            
            <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm transition-colors">
              <FaFileAlt size={14} />
              Create Report
            </button>
          </div>
        </div>
      </div>
      
      {/* Reports Grid */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Reports</h2>
        
        {filteredReports.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaFileAlt className="text-gray-400" size={24} />
            </div>
            <h3 className="text-gray-700 font-medium mb-1">No reports found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredReports.map(report => (
              <div key={report.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-32 bg-gray-100 relative">
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    {report.type === 'performance' && (
                      <svg width="100%" height="100%" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
                          </linearGradient>
                        </defs>
                        {/* Background Grid */}
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        
                        {/* Line Chart */}
                        <path d="M 20,120 L 50,90 L 80,100 L 110,70 L 140,80 L 170,50 L 200,40 L 230,30 L 260,20 L 280,40" 
                          fill="none" stroke="#3B82F6" strokeWidth="2" />
                        
                        {/* Area under the line */}
                        <path d="M 20,120 L 50,90 L 80,100 L 110,70 L 140,80 L 170,50 L 200,40 L 230,30 L 260,20 L 280,40 L 280,120 L 20,120 Z" 
                          fill="url(#performanceGradient)" />
                        
                        {/* Data Points */}
                        <circle cx="20" cy="120" r="3" fill="#3B82F6" />
                        <circle cx="50" cy="90" r="3" fill="#3B82F6" />
                        <circle cx="80" cy="100" r="3" fill="#3B82F6" />
                        <circle cx="110" cy="70" r="3" fill="#3B82F6" />
                        <circle cx="140" cy="80" r="3" fill="#3B82F6" />
                        <circle cx="170" cy="50" r="3" fill="#3B82F6" />
                        <circle cx="200" cy="40" r="3" fill="#3B82F6" />
                        <circle cx="230" cy="30" r="3" fill="#3B82F6" />
                        <circle cx="260" cy="20" r="3" fill="#3B82F6" />
                        <circle cx="280" cy="40" r="3" fill="#3B82F6" />
                      </svg>
                    )}
                    
                    {report.type === 'network' && (
                      <svg width="100%" height="100%" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                        {/* Background */}
                        <rect width="100%" height="100%" fill="#F5F3FF" opacity="0.3" />
                        
                        {/* Network Nodes */}
                        <circle cx="150" cy="75" r="25" fill="#8B5CF6" opacity="0.7" />
                        <circle cx="80" cy="50" r="15" fill="#A78BFA" opacity="0.7" />
                        <circle cx="220" cy="50" r="15" fill="#A78BFA" opacity="0.7" />
                        <circle cx="60" cy="110" r="15" fill="#A78BFA" opacity="0.7" />
                        <circle cx="240" cy="110" r="15" fill="#A78BFA" opacity="0.7" />
                        <circle cx="120" cy="120" r="10" fill="#C4B5FD" opacity="0.7" />
                        <circle cx="180" cy="120" r="10" fill="#C4B5FD" opacity="0.7" />
                        <circle cx="120" cy="30" r="10" fill="#C4B5FD" opacity="0.7" />
                        <circle cx="180" cy="30" r="10" fill="#C4B5FD" opacity="0.7" />
                        
                        {/* Connection Lines */}
                        <line x1="150" y1="75" x2="80" y2="50" stroke="#A78BFA" strokeWidth="2" opacity="0.5" />
                        <line x1="150" y1="75" x2="220" y2="50" stroke="#A78BFA" strokeWidth="2" opacity="0.5" />
                        <line x1="150" y1="75" x2="60" y2="110" stroke="#A78BFA" strokeWidth="2" opacity="0.5" />
                        <line x1="150" y1="75" x2="240" y2="110" stroke="#A78BFA" strokeWidth="2" opacity="0.5" />
                        <line x1="150" y1="75" x2="120" y2="120" stroke="#A78BFA" strokeWidth="2" opacity="0.5" />
                        <line x1="150" y1="75" x2="180" y2="120" stroke="#A78BFA" strokeWidth="2" opacity="0.5" />
                        <line x1="150" y1="75" x2="120" y2="30" stroke="#A78BFA" strokeWidth="2" opacity="0.5" />
                        <line x1="150" y1="75" x2="180" y2="30" stroke="#A78BFA" strokeWidth="2" opacity="0.5" />
                        <line x1="80" y1="50" x2="120" y2="30" stroke="#C4B5FD" strokeWidth="1" opacity="0.5" />
                        <line x1="220" y1="50" x2="180" y2="30" stroke="#C4B5FD" strokeWidth="1" opacity="0.5" />
                        <line x1="60" y1="110" x2="120" y2="120" stroke="#C4B5FD" strokeWidth="1" opacity="0.5" />
                        <line x1="240" y1="110" x2="180" y2="120" stroke="#C4B5FD" strokeWidth="1" opacity="0.5" />
                      </svg>
                    )}
                    
                    {report.type === 'financial' && (
                      <svg width="100%" height="100%" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
                          </linearGradient>
                        </defs>
                        {/* Background */}
                        <rect width="100%" height="100%" fill="#ECFDF5" opacity="0.3" />
                        
                        {/* Horizontal Lines */}
                        <line x1="20" y1="30" x2="280" y2="30" stroke="#D1FAE5" strokeWidth="1" />
                        <line x1="20" y1="60" x2="280" y2="60" stroke="#D1FAE5" strokeWidth="1" />
                        <line x1="20" y1="90" x2="280" y2="90" stroke="#D1FAE5" strokeWidth="1" />
                        <line x1="20" y1="120" x2="280" y2="120" stroke="#D1FAE5" strokeWidth="1" />
                        
                        {/* Bar Chart */}
                        <rect x="40" y="70" width="20" height="50" rx="2" fill="url(#barGradient)" />
                        <rect x="80" y="50" width="20" height="70" rx="2" fill="url(#barGradient)" />
                        <rect x="120" y="80" width="20" height="40" rx="2" fill="url(#barGradient)" />
                        <rect x="160" y="40" width="20" height="80" rx="2" fill="url(#barGradient)" />
                        <rect x="200" y="30" width="20" height="90" rx="2" fill="url(#barGradient)" />
                        <rect x="240" y="60" width="20" height="60" rx="2" fill="url(#barGradient)" />
                        
                        {/* Dollar Signs */}
                        <text x="45" y="65" fontSize="10" fill="#047857" fontWeight="bold">$</text>
                        <text x="85" y="45" fontSize="10" fill="#047857" fontWeight="bold">$</text>
                        <text x="125" y="75" fontSize="10" fill="#047857" fontWeight="bold">$</text>
                        <text x="165" y="35" fontSize="10" fill="#047857" fontWeight="bold">$</text>
                        <text x="205" y="25" fontSize="10" fill="#047857" fontWeight="bold">$</text>
                        <text x="245" y="55" fontSize="10" fill="#047857" fontWeight="bold">$</text>
                      </svg>
                    )}
                  </div>
                  
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button className={`p-1.5 rounded-full ${report.starred ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`}>
                      <FaStar size={12} />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-2 left-2 bg-white/90 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700 flex items-center gap-1">
                    {getReportIcon(report.type)}
                    {getTypeLabel(report.type)}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{report.title}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{report.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt size={10} />
                      {report.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaEye size={10} />
                      {report.views} views
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-2 flex justify-between items-center border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">View Report</button>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <FaShareAlt size={12} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <FaDownload size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Scheduled Reports */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Scheduled Reports</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">+ Schedule New</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Delivery</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scheduledReports.map(report => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.frequency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.nextDelivery}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.recipients} people</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Report Templates */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Report Templates</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <FaChartLine className="text-blue-600" size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Performance Summary</h3>
                <p className="text-xs text-gray-500 mb-3">Comprehensive overview of referral performance metrics</p>
                <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">Generate Report</button>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <FaUserFriends className="text-purple-600" size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Network Analysis</h3>
                <p className="text-xs text-gray-500 mb-3">Detailed breakdown of your professional network</p>
                <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">Generate Report</button>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <FaMoneyBillWave className="text-green-600" size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Financial Impact</h3>
                <p className="text-xs text-gray-500 mb-3">Analysis of revenue generated through referrals</p>
                <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">Generate Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI-Generated Insights */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-white/20 rounded-lg mr-3">
            <FaLightbulb className="text-yellow-300" size={16} />
          </div>
          <h2 className="text-lg font-semibold">AI-Generated Insights</h2>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-medium mb-2">Performance Trend Detected</h3>
            <p className="text-sm opacity-90 mb-3">Your referral conversion rate has increased by 12% since implementing the new follow-up protocol. Would you like a detailed analysis report?</p>
            <button className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded text-sm transition-colors">Generate Analysis</button>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-medium mb-2">Opportunity Identified</h3>
            <p className="text-sm opacity-90 mb-3">Based on your network data, there's potential to increase estate planning referrals by 25%. Would you like recommendations on how to target this opportunity?</p>
            <button className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded text-sm transition-colors">View Recommendations</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
