import React from 'react';
import { FaUserPlus, FaCalendarPlus, FaExternalLinkAlt, FaVideo, FaHandshake } from 'react-icons/fa';

export interface NetworkGrowthSuggestion {
  id: string;
  name: string;
  profession: string;
  company?: string;
  profileImage?: string;
  matchScore: number;
  source: 'external' | 'peer-network' | 'ai-suggested';
  prequal?: {
    reason: string;
    strength: number; // 1-10
  };
}

interface NetworkGrowthSuggestionsProps {
  suggestions: NetworkGrowthSuggestion[];
  onScheduleIntro?: (suggestionId: string) => void;
  onViewMoreInfo?: (suggestionId: string) => void;
}

const NetworkGrowthSuggestions: React.FC<NetworkGrowthSuggestionsProps> = ({
  suggestions,
  onScheduleIntro,
  onViewMoreInfo
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Grow Your Network</h3>
        <span className="text-sm text-blue-600">Pre-qualified opportunities</span>
      </div>
      
      <div className="space-y-4">
        {suggestions.map(suggestion => (
          <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                  {suggestion.profileImage ? (
                    <img src={suggestion.profileImage} alt={suggestion.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl text-gray-400">{suggestion.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{suggestion.name}</h4>
                  <p className="text-sm text-gray-600">{suggestion.profession}</p>
                  {suggestion.company && (
                    <p className="text-xs text-gray-500">{suggestion.company}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-sm font-medium">
                  {suggestion.matchScore}% Match
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {suggestion.source === 'external' && 'From External Network'}
                  {suggestion.source === 'peer-network' && 'From Your Peers'}
                  {suggestion.source === 'ai-suggested' && 'AI Recommended'}
                </div>
              </div>
            </div>
            
            {suggestion.prequal && (
              <div className="mt-3 bg-gray-50 rounded p-2 text-sm">
                <div className="flex items-center text-gray-700">
                  <FaHandshake className="text-blue-600 mr-2" />
                  <span>{suggestion.prequal.reason}</span>
                </div>
                <div className="mt-1 w-full h-1.5 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${(suggestion.prequal.strength / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="mt-4 flex gap-2">
              {onViewMoreInfo && (
                <button 
                  onClick={() => onViewMoreInfo(suggestion.id)}
                  className="flex-1 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                >
                  <FaExternalLinkAlt className="mr-1.5" size={12} />
                  Learn More
                </button>
              )}
              {onScheduleIntro && (
                <button 
                  onClick={() => onScheduleIntro(suggestion.id)}
                  className="flex-1 py-1.5 bg-blue-600 rounded text-sm text-white hover:bg-blue-700 flex items-center justify-center"
                >
                  <FaVideo className="mr-1.5" size={12} />
                  Meet & Decide
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-5 text-center">
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded flex items-center justify-center mx-auto">
          <FaUserPlus className="mr-2" />
          View More Suggestions
        </button>
      </div>
    </div>
  );
};

export default NetworkGrowthSuggestions;
