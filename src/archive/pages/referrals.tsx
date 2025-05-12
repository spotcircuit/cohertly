import Layout from '../components/Layout';
import { FaUserFriends, FaChartLine, FaLightbulb, FaClipboardList, FaFilter, FaSearch, FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

// Mock referrals data
const mockReferrals = [
  {
    id: 1,
    client_name: "John Smith",
    service: "Tax Planning",
    to: "Sarah Johnson",
    status: "Converted",
    date: "May 5, 2025"
  },
  {
    id: 2,
    client_name: "Emily Davis",
    service: "Estate Planning",
    to: "Michael Chen",
    status: "Pending",
    date: "May 3, 2025"
  },
  {
    id: 3,
    client_name: "Mark Johnson",
    service: "Retirement Planning",
    to: "Jessica Williams",
    status: "Converted",
    date: "May 1, 2025"
  },
  {
    id: 4,
    client_name: "Susan Miller",
    service: "Insurance",
    to: "David Miller",
    status: "Lost",
    date: "Apr 28, 2025"
  },
  {
    id: 5,
    client_name: "James Wilson",
    service: "Investment Management",
    to: "Emily Rodriguez",
    status: "Pending",
    date: "Apr 25, 2025"
  }
];

// Mock referees data
const mockReferees = [
  {
    id: 1,
    client_name: "Robert Johnson",
    service: "Tax Planning",
    from: "Sarah Williams",
    status: "Converted",
    date: "May 2, 2025"
  },
  {
    id: 2,
    client_name: "Emily Davis",
    service: "Estate Planning",
    from: "Michael Chen",
    status: "Pending",
    date: "May 4, 2025"
  },
  {
    id: 3,
    client_name: "James Wilson",
    service: "Retirement Planning",
    from: "Jessica Thompson",
    status: "Converted",
    date: "May 1, 2025"
  },
  {
    id: 4,
    client_name: "Amanda Rodriguez",
    service: "Insurance",
    from: "David Miller",
    status: "Declined",
    date: "Apr 28, 2025"
  },
  {
    id: 5,
    client_name: "Thomas Lee",
    service: "Investment Management",
    from: "Emily Rodriguez",
    status: "Pending",
    date: "Apr 25, 2025"
  }
];

export default function Referrals() {
  return (
    <Layout>
      {/* Hero Image */}
      <div className="relative w-full overflow-hidden h-[225px] rounded-lg mb-4">
        <Image 
          src="/images/hero.png" 
          alt="Referrals Hero" 
          width={1920}
          height={225}
          className="w-full h-full object-fill"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg flex items-center gap-3">
            <FaUserFriends /> Referrals Dashboard
          </h1>
        </div>
      </div>
      
      {/* Small padding */}
      <div className="h-2"></div>
      
      {/* Workable Area - Summary Stats */}
      <div className="glass-card p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-3 bg-white rounded-lg border border-blue-100 flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-3">
              <FaUserFriends size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Referrals</p>
              <h3 className="text-xl font-bold text-gray-800">24</h3>
            </div>
          </div>
          
          <div className="p-3 bg-white rounded-lg border border-blue-100 flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-3">
              <FaClipboardList size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Converted</p>
              <h3 className="text-xl font-bold text-gray-800">16 <span className="text-sm text-green-600 font-normal">(67%)</span></h3>
            </div>
          </div>
          
          <div className="p-3 bg-white rounded-lg border border-blue-100 flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-3">
              <FaCalendarAlt size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-xl font-bold text-gray-800">5</h3>
            </div>
          </div>
          
          <div className="p-3 bg-white rounded-lg border border-blue-100 flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-3">
              <FaChartLine size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Revenue</p>
              <h3 className="text-xl font-bold text-gray-800">$1,850</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* New Referral Form - Full Width */}
      <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Referral Form */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
                <FaUserFriends className="text-blue-500" /> New Referral
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="clientName">
                    Client Name *
                  </label>
                  <input
                    id="clientName"
                    className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Smith"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="clientEmail">
                    Client Email
                  </label>
                  <input
                    id="clientEmail"
                    type="email"
                    className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="clientPhone">
                    Client Phone
                  </label>
                  <input
                    id="clientPhone"
                    className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="serviceNeeded">
                    Service Needed *
                  </label>
                  <select
                    id="serviceNeeded"
                    className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a service</option>
                    <option value="Tax Planning">Tax Planning</option>
                    <option value="Estate Planning">Estate Planning</option>
                    <option value="Retirement Planning">Retirement Planning</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Investment Management">Investment Management</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="notes">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any specific details about this referral..."
                />
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <button 
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
                >
                  Clear Form
                </button>
                
                <button
                  className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2 min-w-[150px]"
                >
                  Send Referral
                </button>
              </div>
            </div>
          </div>
          
          {/* Tips Card */}
          <div className="lg:col-span-1">
            <div className="glass-card p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow-lg h-full">
              <h3 className="text-lg font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2">
                <FaLightbulb className="text-indigo-500" /> Referral Tips
              </h3>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="bg-indigo-100 text-indigo-600 rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Be specific about client needs in your notes</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-indigo-100 text-indigo-600 rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Follow up within 48 hours for best results</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-indigo-100 text-indigo-600 rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Include client's preferred contact method</span>
                </li>
              </ul>
              
              <div className="mt-3 pt-3 border-t border-indigo-100">
                <Link href="/referral-stats" className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1">
                  <FaChartLine size={12} /> View Referral Statistics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* My Referrals - Sent */}
      <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg mb-6">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
            <FaUserFriends className="text-blue-500" /> My Referrals (Sent)
          </h3>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <FaSearch size={14} />
              </div>
              <input 
                type="text" 
                className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-auto" 
                placeholder="Search sent..."
              />
            </div>
            
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <FaFilter size={14} />
            </button>
          </div>
        </div>
        
        {/* Referrals Table */}
        <div className="bg-white rounded-lg border border-blue-100 overflow-hidden">
          <table className="min-w-full divide-y divide-blue-100">
            <thead className="bg-blue-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-100">
              {mockReferrals.map(referral => (
                <tr key={referral.id} className="hover:bg-blue-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">{referral.client_name}</div>
                      <div className="text-xs text-gray-500">To: {referral.to}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{referral.service}</div>
                    <div className="text-xs text-gray-500">{referral.date}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      referral.status === 'Converted' ? 'bg-green-100 text-green-800' :
                      referral.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {referral.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Contact</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* My Referees - Received */}
      <div className="glass-card p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow-lg mb-6">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2">
            <FaUserFriends className="text-indigo-500" /> My Referees (Received)
          </h3>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <FaSearch size={14} />
              </div>
              <input 
                type="text" 
                className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-auto" 
                placeholder="Search received..."
              />
            </div>
            
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <FaFilter size={14} />
            </button>
          </div>
        </div>
        
        {/* Referees Table */}
        <div className="bg-white rounded-lg border border-indigo-100 overflow-hidden">
          <table className="min-w-full divide-y divide-indigo-100">
            <thead className="bg-indigo-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-indigo-100">
              {mockReferees.map(referee => (
                <tr key={referee.id} className="hover:bg-indigo-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">{referee.client_name}</div>
                      <div className="text-xs text-gray-500">From: {referee.from}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{referee.service}</div>
                    <div className="text-xs text-gray-500">{referee.date}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      referee.status === 'Converted' ? 'bg-green-100 text-green-800' :
                      referee.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {referee.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Contact</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}