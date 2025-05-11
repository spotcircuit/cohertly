import React, { useState } from 'react';
import { FaInfoCircle, FaFilter, FaSort } from 'react-icons/fa';

interface CrossReferralData {
  [key: string]: {
    [key: string]: boolean;
  }
}

interface ReferralGridProps {
  data: CrossReferralData;
  professions: string[];
}

const ReferralGrid: React.FC<ReferralGridProps> = ({ data, professions }) => {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [showInfo, setShowInfo] = useState<boolean>(false);
  
  // Filter professions based on the current filter
  const filteredProfessions = filter === 'all' 
    ? professions
    : professions.filter(p => {
      // Check if this profession has any referral relationships 
      // matching the filter type
      return professions.some(other => {
        if (filter === 'sends') {
          return data[p] && data[p][other];
        } else if (filter === 'receives') {
          return data[other] && data[other][p];
        }
        return false;
      });
    });
    
  // Sort professions based on the current sort mode
  const sortedProfessions = [...filteredProfessions].sort((a, b) => {
    if (sortBy === 'name') {
      return a.localeCompare(b);
    } else if (sortBy === 'sent') {
      // Sort by number of outgoing referrals
      const aSent = professions.filter(p => data[a] && data[a][p]).length;
      const bSent = professions.filter(p => data[b] && data[b][p]).length;
      return bSent - aSent;
    } else if (sortBy === 'received') {
      // Sort by number of incoming referrals
      const aReceived = professions.filter(p => data[p] && data[p][a]).length;
      const bReceived = professions.filter(p => data[p] && data[p][b]).length;
      return bReceived - aReceived;
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Cross-Referral Grid</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="text-gray-500 hover:text-blue-600"
          >
            <FaInfoCircle />
          </button>
          <div className="relative">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-8 pr-4 py-1 border rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Relationships</option>
              <option value="sends">Sends Referrals</option>
              <option value="receives">Receives Referrals</option>
            </select>
            <FaFilter className="absolute left-2 top-2 text-gray-400" />
          </div>
          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-8 pr-4 py-1 border rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="sent">Sort by Sent</option>
              <option value="received">Sort by Received</option>
            </select>
            <FaSort className="absolute left-2 top-2 text-gray-400" />
          </div>
        </div>
      </div>
      
      {showInfo && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded">
          <p className="text-sm text-blue-700">
            This grid shows potential referral relationships between different professions. 
            Check marks indicate where one profession typically refers to another.
            Use this to identify potential partners for your referral network.
          </p>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="sticky left-0 bg-gray-50 p-2 border text-xs font-medium text-gray-700 z-10">
                Referrer → / Receiver ↓
              </th>
              {sortedProfessions.map(profession => (
                <th key={profession} className="p-2 border text-xs font-medium text-gray-700 min-w-[130px] align-bottom">
                  <div className="transform -rotate-45 origin-top-left translate-y-3 w-32 truncate text-left">
                    {profession}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedProfessions.map(rowProfession => (
              <tr key={rowProfession} className="hover:bg-gray-50">
                <th className="sticky left-0 bg-white p-2 border text-xs font-medium text-gray-700 text-left z-10 hover:bg-gray-50">
                  {rowProfession}
                </th>
                {sortedProfessions.map(colProfession => {
                  const hasReferral = data[colProfession] && data[colProfession][rowProfession];
                  return (
                    <td 
                      key={`${rowProfession}-${colProfession}`} 
                      className={`p-2 border text-center ${rowProfession === colProfession ? 'bg-gray-100' : ''}`}
                    >
                      {rowProfession !== colProfession && hasReferral && (
                        <span className="text-green-600 text-lg">✓</span>
                      )}
                      {rowProfession !== colProfession && !hasReferral && (
                        <span className="text-gray-300">–</span>
                      )}
                      {rowProfession === colProfession && (
                        <span className="text-gray-300">–</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralGrid;
