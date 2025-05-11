import React, { useState } from 'react';
import { FaUserPlus, FaInfoCircle, FaCalendarPlus, FaHandshake, FaStar, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';

interface RecommendationFactor {
  name: string;
  score: number;
  description: string;
  icon: React.ReactNode;
}

export interface Recommendation {
  id: string;
  name: string;
  profession: string;
  matchScore: number;
  factors: RecommendationFactor[];
  isNew?: boolean;
  profileImage?: string;
  lastReferral?: string;
  mutualConnections?: number;
}

interface Props {
  recommendations: Recommendation[];
  onScheduleMeeting?: (recommendationId: string) => void;
  onViewProfile?: (recommendationId: string) => void;
}

const PersonalizedRecommendations: React.FC<Props> = ({ 
  recommendations,
  onScheduleMeeting,
  onViewProfile
}) => {
  const [expandedRecommendation, setExpandedRecommendation] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedRecommendation(expandedRecommendation === id ? null : id);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Personalized Recommendations</h3>
      
      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <div 
            key={recommendation.id}
            className={`border rounded-lg overflow-hidden transition-all duration-200 ${
              recommendation.isNew ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                    {recommendation.profileImage ? (
                      <img src={recommendation.profileImage} alt={recommendation.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl text-gray-400">{recommendation.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {recommendation.name}
                      {recommendation.isNew && (
                        <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">New</span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-600">{recommendation.profession}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium">{recommendation.matchScore}%</span>
                    <div className="ml-1 w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          recommendation.matchScore >= 90 ? 'bg-green-500' :
                          recommendation.matchScore >= 70 ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${recommendation.matchScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleExpand(recommendation.id)}
                    className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                  >
                    {expandedRecommendation === recommendation.id ? 'Hide details' : 'Why?'}
                  </button>
                </div>
              </div>
              
              {recommendation.lastReferral && (
                <div className="mt-2 text-xs text-gray-500">
                  Last referral: {recommendation.lastReferral}
                </div>
              )}
              
              {recommendation.mutualConnections && (
                <div className="mt-1 text-xs text-gray-500">
                  {recommendation.mutualConnections} mutual connections
                </div>
              )}
              
              {expandedRecommendation === recommendation.id && (
                <div className="mt-4 bg-gray-50 p-3 rounded text-sm">
                  <h5 className="font-medium text-gray-700 mb-2">Match Factors:</h5>
                  <div className="space-y-2">
                    {recommendation.factors.map((factor, index) => (
                      <div key={index} className="flex items-center">
                        <div className="mr-2 text-blue-600">
                          {factor.icon}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <span className="text-gray-700">{factor.name}</span>
                            <span className="text-gray-500">{factor.score}/10</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                            <div 
                              className="h-full bg-blue-600 rounded-full" 
                              style={{ width: `${(factor.score / 10) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{factor.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-4 flex space-x-2">
                {onViewProfile && (
                  <button 
                    onClick={() => onViewProfile(recommendation.id)}
                    className="flex-1 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                  >
                    <FaUserPlus className="mr-1" size={12} />
                    View Profile
                  </button>
                )}
                {onScheduleMeeting && (
                  <button 
                    onClick={() => onScheduleMeeting(recommendation.id)}
                    className="flex-1 py-1.5 bg-blue-600 rounded text-sm text-white hover:bg-blue-700 flex items-center justify-center"
                  >
                    <FaCalendarPlus className="mr-1" size={12} />
                    Schedule Meeting
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Predefined factor icons
export const FACTOR_ICONS = {
  mutualConnections: <FaHandshake />,
  referralPotential: <FaChartLine />,
  pastReferrals: <FaUserPlus />,
  profileStrength: <FaStar />,
  industryAlignment: <FaInfoCircle />
};

export default PersonalizedRecommendations;
