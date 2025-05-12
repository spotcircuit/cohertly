import { useState } from 'react';
import Layout from '../components/Layout';
import { 
  FaChartLine, FaChartBar, FaChartPie, FaCalendarAlt, 
  FaArrowUp, FaArrowDown, FaExchangeAlt, FaUserFriends,
  FaFilter, FaDownload, FaInfoCircle
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for referral statistics
const monthlyReferrals = [
  { month: 'Jan', count: 12 },
  { month: 'Feb', count: 15 },
  { month: 'Mar', count: 18 },
  { month: 'Apr', count: 14 },
  { month: 'May', count: 22 },
  { month: 'Jun', count: 28 },
  { month: 'Jul', count: 25 },
  { month: 'Aug', count: 30 },
  { month: 'Sep', count: 35 },
  { month: 'Oct', count: 32 },
  { month: 'Nov', count: 38 },
  { month: 'Dec', count: 42 },
];

const conversionRates = [
  { month: 'Jan', rate: 25 },
  { month: 'Feb', rate: 28 },
  { month: 'Mar', rate: 30 },
  { month: 'Apr', rate: 27 },
  { month: 'May', rate: 32 },
  { month: 'Jun', rate: 35 },
  { month: 'Jul', rate: 34 },
  { month: 'Aug', rate: 38 },
  { month: 'Sep', rate: 40 },
  { month: 'Oct', rate: 37 },
  { month: 'Nov', rate: 42 },
  { month: 'Dec', rate: 45 },
];

const referralsByType = [
  { type: 'Tax Planning', count: 45, color: 'blue' },
  { type: 'Estate Planning', count: 32, color: 'indigo' },
  { type: 'Retirement Planning', count: 28, color: 'purple' },
  { type: 'Insurance', count: 22, color: 'green' },
  { type: 'Investment Management', count: 18, color: 'yellow' },
  { type: 'Other', count: 12, color: 'gray' },
];

const topReferrers = [
  { id: 1, name: 'David Miller', count: 24, conversion: 75 },
  { id: 2, name: 'Jessica Thompson', count: 18, conversion: 82 },
  { id: 3, name: 'Michael Chen', count: 15, conversion: 68 },
  { id: 4, name: 'Sarah Johnson', count: 12, conversion: 90 },
  { id: 5, name: 'Robert Wilson', count: 10, conversion: 65 },
];

const recentReferrals = [
  { id: 1, client: 'John Smith', service: 'Tax Planning', status: 'Converted', date: '2025-05-05' },
  { id: 2, client: 'Emily Davis', service: 'Estate Planning', status: 'Pending', date: '2025-05-03' },
  { id: 3, client: 'Mark Johnson', service: 'Retirement Planning', status: 'Converted', date: '2025-05-01' },
  { id: 4, client: 'Susan Miller', service: 'Insurance', status: 'Lost', date: '2025-04-28' },
  { id: 5, client: 'James Wilson', service: 'Investment Management', status: 'Pending', date: '2025-04-25' },
];

// Summary metrics
const summaryMetrics = [
  { id: 1, name: 'Total Referrals', value: 157, change: 12, isPositive: true },
  { id: 2, name: 'Conversion Rate', value: '38%', change: 5, isPositive: true },
  { id: 3, name: 'Avg. Revenue', value: '$2,450', change: 8, isPositive: true },
  { id: 4, name: 'Response Time', value: '24h', change: 2, isPositive: false },
];

export default function ReferralStats() {
  const [timeframe, setTimeframe] = useState('year'); // 'year', 'quarter', 'month'
  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  
  // Calculate the maximum value for the chart to scale properly
  const maxReferrals = Math.max(...monthlyReferrals.map(item => item.count));
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <Layout>
      {/* Hero Image */}
      <div className="relative w-full overflow-hidden h-[225px] rounded-lg mb-4">
        <Image 
          src="/images/hero.png" 
          alt="Referral Stats Hero" 
          width={1920}
          height={225}
          className="w-full h-full object-fill"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg flex items-center gap-3">
            <FaChartLine /> Referral Statistics
          </h1>
        </div>
      </div>
      
      {/* Small padding */}
      <div className="h-2"></div>
      
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryMetrics.map(metric => (
          <div 
            key={metric.id}
            className="glass-card p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{metric.name}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{metric.value}</h3>
              </div>
              <div className={`flex items-center ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {metric.isPositive ? <FaArrowUp size={14} /> : <FaArrowDown size={14} />}
                <span className="ml-1 text-sm">{metric.change}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Referrals Over Time Chart */}
          <div className="glass-card p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg">
            <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
              <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Referrals Over Time
              </h3>
              
              <div className="flex items-center">
                <div className="flex border border-blue-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setTimeframe('month')}
                    className={`px-3 py-1 text-xs ${timeframe === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 hover:bg-blue-50'}`}
                  >
                    Month
                  </button>
                  <button 
                    onClick={() => setTimeframe('quarter')}
                    className={`px-3 py-1 text-xs ${timeframe === 'quarter' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 hover:bg-blue-50'}`}
                  >
                    Quarter
                  </button>
                  <button 
                    onClick={() => setTimeframe('year')}
                    className={`px-3 py-1 text-xs ${timeframe === 'year' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 hover:bg-blue-50'}`}
                  >
                    Year
                  </button>
                </div>
                
                <button className="ml-2 p-1.5 text-blue-600 hover:bg-blue-100 rounded">
                  <FaDownload size={14} />
                </button>
              </div>
            </div>
            
            {/* Chart */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="relative h-64">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500">
                  <span>50</span>
                  <span>40</span>
                  <span>30</span>
                  <span>20</span>
                  <span>10</span>
                  <span>0</span>
                </div>
                
                {/* Chart grid */}
                <div className="absolute left-10 right-0 top-0 bottom-0">
                  {[0, 1, 2, 3, 4, 5].map(i => (
                    <div 
                      key={i} 
                      className="absolute left-0 right-0 border-t border-gray-100"
                      style={{ bottom: `${i * 20}%` }}
                    ></div>
                  ))}
                </div>
                
                {/* Bars */}
                <div className="absolute left-10 right-0 top-0 bottom-0 flex items-end justify-around">
                  {monthlyReferrals.map((item, index) => (
                    <div 
                      key={index}
                      className="relative flex flex-col items-center group"
                      onMouseEnter={() => setShowTooltip(index)}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <div 
                        className="w-12 bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-sm hover:opacity-90 transition-opacity"
                        style={{ height: `${(item.count / 50) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">{item.month}</span>
                      
                      {/* Tooltip */}
                      {showTooltip === index && (
                        <div className="absolute bottom-full mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          {item.count} Referrals in {item.month}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Conversion Rate Chart */}
          <div className="glass-card p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Conversion Rate Trend
              </h3>
              
              <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded">
                <FaInfoCircle size={14} />
              </button>
            </div>
            
            {/* Chart */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="relative h-48">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500">
                  <span>50%</span>
                  <span>40%</span>
                  <span>30%</span>
                  <span>20%</span>
                  <span>10%</span>
                  <span>0%</span>
                </div>
                
                {/* Chart grid */}
                <div className="absolute left-10 right-0 top-0 bottom-0">
                  {[0, 1, 2, 3, 4, 5].map(i => (
                    <div 
                      key={i} 
                      className="absolute left-0 right-0 border-t border-gray-100"
                      style={{ bottom: `${i * 20}%` }}
                    ></div>
                  ))}
                </div>
                
                {/* Line */}
                <div className="absolute left-10 right-0 top-0 bottom-0">
                  <svg className="w-full h-full" viewBox="0 0 1200 480" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(79, 70, 229, 0.2)" />
                        <stop offset="100%" stopColor="rgba(79, 70, 229, 0)" />
                      </linearGradient>
                    </defs>
                    
                    {/* Area under the line */}
                    <path 
                      d={`M0,${480 - (conversionRates[0].rate / 50) * 480} ${conversionRates.map((item, i) => `L${(i / (conversionRates.length - 1)) * 1200},${480 - (item.rate / 50) * 480}`).join(' ')} L1200,480 L0,480 Z`}
                      fill="url(#gradient)"
                    />
                    
                    {/* Line */}
                    <path 
                      d={`M0,${480 - (conversionRates[0].rate / 50) * 480} ${conversionRates.map((item, i) => `L${(i / (conversionRates.length - 1)) * 1200},${480 - (item.rate / 50) * 480}`).join(' ')}`}
                      fill="none"
                      stroke="#4F46E5"
                      strokeWidth="3"
                    />
                    
                    {/* Points */}
                    {conversionRates.map((item, i) => (
                      <circle 
                        key={i}
                        cx={(i / (conversionRates.length - 1)) * 1200}
                        cy={480 - (item.rate / 50) * 480}
                        r="4"
                        fill="#4F46E5"
                      />
                    ))}
                  </svg>
                </div>
                
                {/* X-axis labels */}
                <div className="absolute left-10 right-0 bottom-0 flex justify-between text-xs text-gray-500 pt-2">
                  {conversionRates.filter((_, i) => i % 3 === 0).map((item, i) => (
                    <span key={i}>{item.month}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Stats and Tables */}
        <div className="lg:col-span-1 space-y-6">
          {/* Referrals by Type */}
          <div className="glass-card p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
              Referrals by Type
            </h3>
            
            <div className="space-y-3">
              {referralsByType.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-800">{item.type}</span>
                    <span className="text-sm text-gray-600">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${item.color}-500 h-2 rounded-full`}
                      style={{ width: `${(item.count / referralsByType.reduce((acc, curr) => acc + curr.count, 0)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Top Referrers */}
          <div className="glass-card p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
              Top Referrers
            </h3>
            
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrals</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conv.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topReferrers.map((referrer) => (
                    <tr key={referrer.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{referrer.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{referrer.count}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          referrer.conversion >= 80 ? 'bg-green-100 text-green-800' :
                          referrer.conversion >= 60 ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {referrer.conversion}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-100">
              <Link href="/referrals" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                <FaUserFriends size={12} /> Manage Referrals
              </Link>
            </div>
          </div>
          
          {/* Recent Referrals */}
          <div className="glass-card p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Recent Referrals
              </h3>
              
              <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded">
                <FaFilter size={14} />
              </button>
            </div>
            
            <div className="space-y-2">
              {recentReferrals.map((referral) => (
                <div key={referral.id} className="bg-white rounded-lg p-3 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">{referral.client}</h4>
                      <p className="text-xs text-gray-500">{referral.service}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        referral.status === 'Converted' ? 'bg-green-100 text-green-800' :
                        referral.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {referral.status}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">{formatDate(referral.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-100">
              <Link href="/referrals" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                <FaExchangeAlt size={12} /> View All Referrals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
