import { useQuery } from '@tanstack/react-query';
import { Referral } from '../types';
import { FaCheckCircle, FaClock, FaEdit, FaFilter, FaTimesCircle, FaExclamationTriangle, FaUserFriends, FaSort, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

const statusIcons: Record<string, React.ReactNode> = {
  completed: <FaCheckCircle className="text-green-500" title="Completed" />,
  pending: <FaClock className="text-yellow-500" title="Pending" />,
  rejected: <FaTimesCircle className="text-red-500" title="Rejected" />,
  in_progress: <FaExclamationTriangle className="text-orange-500" title="In Progress" />
};

// Mock data for referrals
const mockReferrals: Referral[] = [
  { 
    id: '1', 
    sender_id: 'user1', 
    receiver_id: 'partner1', 
    client_name: 'Robert Smith', 
    notes: 'Looking for comprehensive tax planning services for small business', 
    status: 'completed', 
    created_at: '2025-04-28T14:30:00Z' 
  },
  { 
    id: '2', 
    sender_id: 'user1', 
    receiver_id: 'partner2', 
    client_name: 'Jennifer Lee', 
    notes: 'Needs estate planning services, has complex family situation', 
    status: 'pending', 
    created_at: '2025-05-06T09:15:00Z' 
  },
  { 
    id: '3', 
    sender_id: 'user1', 
    receiver_id: 'partner3', 
    client_name: 'Mark Wilson', 
    notes: 'Interested in retirement planning, looking to retire in 5 years', 
    status: 'in_progress', 
    created_at: '2025-05-05T16:45:00Z' 
  },
  { 
    id: '4', 
    sender_id: 'user1', 
    receiver_id: 'partner4', 
    client_name: 'Sarah Johnson', 
    notes: 'Looking for investment advice for college savings', 
    status: 'completed', 
    created_at: '2025-04-20T11:30:00Z' 
  },
  { 
    id: '5', 
    sender_id: 'user1', 
    receiver_id: 'partner5', 
    client_name: 'Michael Chen', 
    notes: 'Needs insurance review, current policies may be inadequate', 
    status: 'rejected', 
    created_at: '2025-05-01T10:00:00Z' 
  },
  { 
    id: '6', 
    sender_id: 'user1', 
    receiver_id: 'partner6', 
    client_name: 'Lisa Rodriguez', 
    notes: 'Business owner looking for tax and financial planning', 
    status: 'pending', 
    created_at: '2025-05-04T13:20:00Z' 
  },
];

export default function ReferralList() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filteredData, setFilteredData] = useState<Referral[]>([]);
  
  // Use mock data for now, but keep the query structure for future API integration
  const { data = mockReferrals } = useQuery<Referral[]>({
    queryKey: ['referrals'],
    queryFn: () => Promise.resolve(mockReferrals),
    // In a real app, we would use this:
    // queryFn: () => fetch('/api/referrals').then((res) => res.json()),
  });
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...data];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(r => r.status === statusFilter);
    }
    
    // Apply sorting by date
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    setFilteredData(result);
  }, [data, statusFilter, sortDirection]);
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };
  
  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
          <FaUserFriends className="text-blue-500" /> My Referrals
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg pl-8 pr-4 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-blue-500">
              <FaFilter size={14} />
            </div>
          </div>
          
          <button 
            onClick={toggleSortDirection}
            className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg px-3 py-1.5 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 flex items-center gap-1"
          >
            {sortDirection === 'desc' ? <FaSortAmountDown size={14} /> : <FaSortAmountUp size={14} />}
            <span className="hidden sm:inline">Date</span>
          </button>
        </div>
      </div>
      
      {filteredData.length === 0 ? (
        <div className="bg-white/50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No referrals found matching your filters.</p>
        </div>
      ) : (
        <div className="bg-white/50 rounded-lg overflow-hidden shadow">
          <ul className="divide-y divide-gray-200">
            {filteredData.map((r: Referral) => (
              <li key={r.id} className="hover:bg-blue-50/50 transition-colors">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {statusIcons[r.status] || <FaClock className="text-gray-400" title={r.status} />}
                      <span className="font-medium text-gray-900">{r.client_name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" 
                        style={{
                          backgroundColor: r.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 
                                         r.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : 
                                         r.status === 'rejected' ? 'rgba(239, 68, 68, 0.1)' :
                                         'rgba(59, 130, 246, 0.1)',
                          color: r.status === 'completed' ? 'rgb(16, 185, 129)' : 
                                 r.status === 'pending' ? 'rgb(245, 158, 11)' : 
                                 r.status === 'rejected' ? 'rgb(239, 68, 68)' :
                                 'rgb(59, 130, 246)'
                        }}
                      >
                        {r.status.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(r.created_at)}</span>
                  </div>
                  
                  {r.notes && (
                    <p className="text-sm text-gray-600 ml-6 mb-2">{r.notes}</p>
                  )}
                  
                  <div className="flex justify-end mt-2">
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                      <FaEdit size={12} /> Update Status
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>{filteredData.length} referrals</span>
        <button className="text-blue-600 hover:text-blue-800 hover:underline">
          View All Activity
        </button>
      </div>
    </div>
  );
}