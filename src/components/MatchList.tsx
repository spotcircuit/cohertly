import { useQuery } from '@tanstack/react-query';
import { Match } from '../types';
import { mockUsers, mockMatches } from '../utils/mock';
import { FaUserTie, FaBolt, FaFilter, FaSortAmountDown, FaSortAmountUp, FaHandshake, FaStar, FaEnvelope, FaPhoneAlt, FaBuilding, FaInfoCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function MatchList() {
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filteredData, setFilteredData] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  
  // Use mock data for now, but keep the query structure for future API integration
  const { data = mockMatches } = useQuery<Match[]>({
    queryKey: ['matches'],
    queryFn: () => Promise.resolve(mockMatches),
    // In a real app, we would use this:
    // queryFn: () => fetch('/api/matches').then((res) => res.json()),
  });
  
  // Get unique industries for filtering
  const industries = Array.from(new Set(mockUsers.map(user => user.industry)));
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...data];
    
    // Apply industry filter
    if (industryFilter !== 'all') {
      result = result.filter(m => {
        const user = mockUsers.find(u => u.id === m.partner_id);
        return user?.industry === industryFilter;
      });
    }
    
    // Apply sorting by score
    result.sort((a, b) => {
      return sortDirection === 'asc' ? a.score - b.score : b.score - a.score;
    });
    
    setFilteredData(result);
  }, [data, industryFilter, sortDirection]);
  
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
  
  // Toggle selected match
  const toggleMatchDetails = (id: string) => {
    setSelectedMatch(prev => prev === id ? null : id);
  };

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
          <FaHandshake className="text-blue-500" /> AI Partner Matches
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              className="bg-white/70 border border-blue-200 text-gray-700 text-sm rounded-lg pl-8 pr-4 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              <option value="all">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
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
            <span className="hidden sm:inline">Score</span>
          </button>
        </div>
      </div>
      
      {filteredData.length === 0 ? (
        <div className="bg-white/50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No matches found matching your filters.</p>
        </div>
      ) : (
        <div className="bg-white/50 rounded-lg overflow-hidden shadow">
          <ul className="divide-y divide-gray-200">
            {filteredData.map((m: Match) => {
              const user = mockUsers.find((u) => u.id === m.partner_id);
              const isSelected = selectedMatch === m.id;
              
              return (
                <li key={m.id} className={`transition-colors ${isSelected ? 'bg-blue-50/80' : 'hover:bg-blue-50/50'}`}>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full p-2">
                          <FaUserTie />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{user?.name}</h4>
                          <p className="text-xs text-gray-500">{user?.industry}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <FaStar className={`${m.score >= 90 ? 'text-yellow-500' : m.score >= 80 ? 'text-blue-500' : 'text-gray-400'}`} />
                            <span className="font-bold text-lg">{m.score}</span>
                          </div>
                          <p className="text-xs text-gray-500">Match Score</p>
                        </div>
                        
                        <button 
                          onClick={() => toggleMatchDetails(m.id)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <FaInfoCircle size={12} /> {isSelected ? 'Hide Details' : 'View Details'}
                        </button>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="mt-4 ml-12 bg-white rounded-lg p-4 border border-blue-100">
                        <div className="mb-3">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">AI Match Analysis</h5>
                          <p className="text-sm text-gray-600">{m.ai_notes}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <FaEnvelope className="text-blue-500" />
                            <a href={`mailto:${user?.email}`} className="text-sm text-blue-600 hover:underline">{user?.email}</a>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaPhoneAlt className="text-blue-500" />
                            <span className="text-sm text-gray-600">(555) 123-4567</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <FaBuilding className="text-blue-500" />
                          <span className="text-sm text-gray-600">{user?.industry} Professional</span>
                        </div>
                        
                        <div className="mt-4 flex justify-end gap-2">
                          <button className="bg-white border border-gray-300 text-gray-700 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                            Save for Later
                          </button>
                          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors">
                            Connect Now
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">Matched {formatDate(m.created_at)}</span>
                      {!isSelected && (
                        <button className="text-blue-600 hover:text-blue-800 text-xs hover:underline">
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>{filteredData.length} potential partners</span>
        <button className="text-blue-600 hover:text-blue-800 hover:underline">
          View All Matches
        </button>
      </div>
    </div>
  );
}