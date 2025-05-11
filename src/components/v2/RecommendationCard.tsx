import React, { useState } from 'react';
import { 
  FaUserTie, FaHandshake, FaChartLine, FaMapMarkerAlt, 
  FaBriefcase, FaUsers, FaStar, FaCheck, FaInfoCircle,
  FaThumbsUp, FaThumbsDown, FaChevronDown, FaChevronUp
} from 'react-icons/fa';

interface MatchFactor {
  id: string;
  name: string;
  description: string;
  score: number;
  icon: React.ReactNode;
  details?: string;
}

interface RecommendationCardProps {
  contact: {
    id: number;
    name: string;
    profession: string;
    company: string;
    location: string;
    profileImage?: string;
    matchScore: number;
    mutualConnections?: number;
    activeReferrals?: number;
    specialties?: string[];
    bio?: string;
  };
  matchFactors: MatchFactor[];
  onSendReferral?: (contactId: number) => void;
  onConnect?: (contactId: number) => void;
  onDismiss?: (contactId: number) => void;
  onFeedback?: (contactId: number, isPositive: boolean, feedback?: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  contact,
  matchFactors,
  onSendReferral,
  onConnect,
  onDismiss,
  onFeedback
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  
  // Sort match factors by score (highest first)
  const sortedFactors = [...matchFactors].sort((a, b) => b.score - a.score);
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            {contact.profileImage ? (
              <img 
                src={contact.profileImage} 
                alt={contact.name} 
                className="h-12 w-12 rounded-full"
              />
            ) : (
              contact.name.split(' ').map(n => n[0]).join('')
            )}
          </div>
          
          <div className="ml-4 flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                <p className="text-sm text-gray-600">{contact.profession}</p>
              </div>
              
              <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                <span className="text-sm font-medium">{contact.matchScore}%</span>
                <span className="ml-1 text-xs">match</span>
              </div>
            </div>
            
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <FaBriefcase className="mr-1" />
              <span>{contact.company}</span>
            </div>
            
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <FaMapMarkerAlt className="mr-1" />
              <span>{contact.location}</span>
            </div>
          </div>
        </div>
        
        {contact.specialties && contact.specialties.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {contact.specialties.map((specialty, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}
        
        {contact.bio && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {contact.bio}
          </p>
        )}
      </div>
      
      {/* Match Factors Summary */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-gray-700">Why this match?</h4>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            {expanded ? (
              <>
                <span>Less detail</span>
                <FaChevronUp className="ml-1" />
              </>
            ) : (
              <>
                <span>More detail</span>
                <FaChevronDown className="ml-1" />
              </>
            )}
          </button>
        </div>
        
        {/* Top 3 factors preview */}
        {!expanded && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {sortedFactors.slice(0, 3).map(factor => (
              <div 
                key={factor.id}
                className="bg-white rounded p-2 border border-gray-200 flex flex-col items-center text-center"
              >
                <div className="text-blue-600 mb-1">
                  {factor.icon}
                </div>
                <div className="text-xs font-medium text-gray-800">{factor.name}</div>
                <div className="text-xs text-gray-500 mt-1">{factor.score}%</div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Expanded Match Factors */}
      {expanded && (
        <div className="p-4 border-b border-gray-100">
          <div className="space-y-3">
            {sortedFactors.map(factor => (
              <div 
                key={factor.id}
                className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start">
                  <div className="text-blue-600 mr-3 mt-0.5">
                    {factor.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h5 className="font-medium text-gray-800">{factor.name}</h5>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                          <div 
                            className={`h-1.5 rounded-full ${
                              factor.score > 80 ? 'bg-green-600' : 
                              factor.score > 60 ? 'bg-blue-600' : 
                              factor.score > 40 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${factor.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{factor.score}%</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">{factor.description}</p>
                    
                    {factor.details && (
                      <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        {factor.details}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start">
            <FaInfoCircle className="text-blue-600 mr-3 mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-gray-800">About Match Scores</h5>
              <p className="text-xs text-gray-600 mt-1">
                Match scores are calculated based on professional compatibility, geographic proximity, 
                specialization alignment, past referral success, and relationship quality. Your feedback 
                helps improve future recommendations.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Actions */}
      <div className="p-4">
        <div className="flex gap-2">
          <button 
            onClick={() => onSendReferral && onSendReferral(contact.id)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <FaHandshake className="mr-2" />
            Send Referral
          </button>
          
          <button 
            onClick={() => onConnect && onConnect(contact.id)}
            className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            <FaUserTie className="mr-2" />
            Connect
          </button>
        </div>
        
        <div className="mt-3 flex justify-between">
          <button 
            onClick={() => onDismiss && onDismiss(contact.id)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Dismiss
          </button>
          
          {!showFeedback ? (
            <button 
              onClick={() => setShowFeedback(true)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Provide Feedback
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  onFeedback && onFeedback(contact.id, true, feedbackText);
                  setShowFeedback(false);
                  setFeedbackText('');
                }}
                className="text-green-600 hover:text-green-800"
              >
                <FaThumbsUp />
              </button>
              
              <button 
                onClick={() => {
                  onFeedback && onFeedback(contact.id, false, feedbackText);
                  setShowFeedback(false);
                  setFeedbackText('');
                }}
                className="text-red-600 hover:text-red-800"
              >
                <FaThumbsDown />
              </button>
            </div>
          )}
        </div>
        
        {showFeedback && (
          <div className="mt-3">
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Why is this recommendation helpful or not helpful?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              rows={2}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Sample match factors for easy reuse
export const sampleMatchFactors: MatchFactor[] = [
  {
    id: 'professional_compatibility',
    name: 'Professional Compatibility',
    description: 'Your profession frequently refers to this type of professional',
    score: 95,
    icon: <FaHandshake />,
    details: 'Financial Advisors and Estate Attorneys have a 95% referral compatibility based on our cross-referral grid.'
  },
  {
    id: 'geographic_proximity',
    name: 'Geographic Proximity',
    description: 'Located in the same region as you',
    score: 90,
    icon: <FaMapMarkerAlt />,
    details: 'Both located in Chicago, IL which facilitates in-person meetings and local client referrals.'
  },
  {
    id: 'specialization_alignment',
    name: 'Specialization Alignment',
    description: 'Their specialties complement your services',
    score: 85,
    icon: <FaBriefcase />,
    details: 'Their focus on estate planning for high net worth clients aligns with your wealth management services.'
  },
  {
    id: 'network_overlap',
    name: 'Network Overlap',
    description: 'You share connections with this professional',
    score: 70,
    icon: <FaUsers />,
    details: 'You have 3 mutual connections including Michael Chen and Robert Johnson.'
  },
  {
    id: 'referral_history',
    name: 'Referral History',
    description: 'Past referral performance in the network',
    score: 88,
    icon: <FaChartLine />,
    details: 'This professional has a 88% referral conversion rate across the network.'
  },
  {
    id: 'personal_preference',
    name: 'Human Factor',
    description: 'Based on your preferences and relationship quality',
    score: 75,
    icon: <FaStar />,
    details: 'Professionals with similar communication styles and business approaches to yours.'
  }
];

export default RecommendationCard;
