import React, { useState } from 'react';
import Layout from '../../components/Layout';
import RecommendationCard, { sampleMatchFactors } from '../../components/v2/RecommendationCard';
import Link from 'next/link';
import { 
  FaArrowLeft, FaFilter, FaSortAmountDown, FaSearch,
  FaNetworkWired, FaUserPlus, FaInfoCircle, FaChartLine,
  FaHandshake, FaMapMarkerAlt, FaBriefcase, FaUsers, FaStar
} from 'react-icons/fa';

// Sample recommended matches data
const sampleMatches = [
  {
    id: 1,
    name: 'Jessica Thompson',
    profession: 'Estate Attorney',
    company: 'Thompson Legal Group',
    location: 'Chicago, IL',
    matchScore: 95,
    mutualConnections: 3,
    activeReferrals: 2,
    specialties: ['Estate Planning', 'Trusts', 'High Net Worth'],
    bio: 'Estate attorney with 10+ years of experience specializing in high net worth clients and complex estate planning.'
  },
  {
    id: 2,
    name: 'David Wilson',
    profession: 'CPA',
    company: 'Wilson Tax Advisors',
    location: 'Chicago, IL',
    matchScore: 92,
    mutualConnections: 2,
    activeReferrals: 1,
    specialties: ['Tax Planning', 'Business Accounting', 'Retirement Planning'],
    bio: 'Certified Public Accountant focusing on tax optimization strategies for individuals and small businesses.'
  },
  {
    id: 3,
    name: 'Rebecca Martinez',
    profession: 'Insurance Agent',
    company: 'Secure Insurance Solutions',
    location: 'Evanston, IL',
    matchScore: 88,
    mutualConnections: 1,
    activeReferrals: 0,
    specialties: ['Life Insurance', 'Long-term Care', 'Disability Insurance'],
    bio: 'Insurance specialist with expertise in comprehensive coverage for professionals and their clients.'
  },
  {
    id: 4,
    name: 'Michael Chen',
    profession: 'Mortgage Broker',
    company: 'Premier Mortgage Group',
    location: 'Chicago, IL',
    matchScore: 85,
    mutualConnections: 2,
    activeReferrals: 1,
    specialties: ['Residential Mortgages', 'Refinancing', 'Investment Properties'],
    bio: 'Experienced mortgage broker specializing in finding the best rates and terms for homebuyers and investors.'
  },
  {
    id: 5,
    name: 'Sarah Johnson',
    profession: 'Financial Advisor',
    company: 'Johnson Wealth Management',
    location: 'Oak Park, IL',
    matchScore: 82,
    mutualConnections: 4,
    activeReferrals: 3,
    specialties: ['Retirement Planning', 'Investment Management', 'Estate Planning'],
    bio: 'Holistic financial advisor focused on creating comprehensive financial plans for individuals and families.'
  }
];

// Custom match factors for each recommendation
const matchFactorsMap = {
  1: [
    {
      id: 'professional_compatibility',
      name: 'Professional Compatibility',
      description: 'Financial Advisors frequently refer to Estate Attorneys',
      score: 95,
      icon: <FaHandshake />,
      details: 'Financial Advisors and Estate Attorneys have a 95% referral compatibility based on our cross-referral grid.'
    },
    {
      id: 'geographic_proximity',
      name: 'Geographic Proximity',
      description: 'Located in the same city as you',
      score: 90,
      icon: <FaMapMarkerAlt />,
      details: 'Both located in Chicago, IL which facilitates in-person meetings and local client referrals.'
    },
    {
      id: 'specialization_alignment',
      name: 'Specialization Alignment',
      description: 'Their high net worth focus complements your services',
      score: 92,
      icon: <FaBriefcase />,
      details: 'Their focus on estate planning for high net worth clients aligns with your wealth management services.'
    },
    {
      id: 'network_overlap',
      name: 'Network Overlap',
      description: 'You share 3 mutual connections',
      score: 85,
      icon: <FaUsers />,
      details: 'You have 3 mutual connections including Michael Chen and Robert Johnson.'
    },
    {
      id: 'referral_history',
      name: 'Referral History',
      description: 'Excellent referral performance in the network',
      score: 88,
      icon: <FaChartLine />,
      details: 'This professional has a 88% referral conversion rate across the network.'
    }
  ],
  2: [
    {
      id: 'professional_compatibility',
      name: 'Professional Compatibility',
      description: 'Financial Advisors frequently refer to CPAs',
      score: 92,
      icon: <FaHandshake />,
      details: 'Financial Advisors and CPAs have a 92% referral compatibility based on our cross-referral grid.'
    },
    {
      id: 'specialization_alignment',
      name: 'Specialization Alignment',
      description: 'Tax planning expertise complements your services',
      score: 94,
      icon: <FaBriefcase />,
      details: 'Their tax planning expertise directly complements your financial planning services.'
    },
    {
      id: 'geographic_proximity',
      name: 'Geographic Proximity',
      description: 'Located in the same city as you',
      score: 90,
      icon: <FaMapMarkerAlt />,
      details: 'Both located in Chicago, IL which facilitates in-person meetings and local client referrals.'
    },
    {
      id: 'network_overlap',
      name: 'Network Overlap',
      description: 'You share 2 mutual connections',
      score: 75,
      icon: <FaUsers />,
      details: 'You have 2 mutual connections including Sarah Williams and Amanda Wilson.'
    },
    {
      id: 'personal_preference',
      name: 'Human Factor',
      description: 'Based on your preferences and relationship quality',
      score: 80,
      icon: <FaStar />,
      details: 'Professionals with similar communication styles and business approaches to yours.'
    }
  ],
  3: sampleMatchFactors.map(factor => ({
    ...factor,
    description: factor.description.replace('this type of professional', 'Insurance Agents')
  })),
  4: sampleMatchFactors.map(factor => ({
    ...factor,
    description: factor.description.replace('this type of professional', 'Mortgage Brokers')
  })),
  5: sampleMatchFactors.map(factor => ({
    ...factor,
    description: factor.description.replace('this type of professional', 'Financial Advisors')
  }))
};

// Filter categories
const filterCategories = [
  {
    id: 'profession',
    name: 'Profession',
    options: [
      { id: 'estate_attorney', name: 'Estate Attorney' },
      { id: 'cpa', name: 'CPA' },
      { id: 'insurance_agent', name: 'Insurance Agent' },
      { id: 'mortgage_broker', name: 'Mortgage Broker' },
      { id: 'financial_advisor', name: 'Financial Advisor' }
    ]
  },
  {
    id: 'location',
    name: 'Location',
    options: [
      { id: 'chicago', name: 'Chicago, IL' },
      { id: 'evanston', name: 'Evanston, IL' },
      { id: 'oak_park', name: 'Oak Park, IL' }
    ]
  },
  {
    id: 'match_score',
    name: 'Match Score',
    options: [
      { id: '90_plus', name: '90% and above' },
      { id: '80_89', name: '80-89%' },
      { id: '70_79', name: '70-79%' }
    ]
  },
  {
    id: 'specialties',
    name: 'Specialties',
    options: [
      { id: 'estate_planning', name: 'Estate Planning' },
      { id: 'tax_planning', name: 'Tax Planning' },
      { id: 'retirement_planning', name: 'Retirement Planning' },
      { id: 'insurance', name: 'Insurance' },
      { id: 'mortgages', name: 'Mortgages' }
    ]
  }
];

export default function MatchesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [matches, setMatches] = useState(sampleMatches);
  
  // Handle sending a referral
  const handleSendReferral = (contactId: number) => {
    console.log(`Sending referral to contact ${contactId}`);
    // In a real implementation, this would open a referral form
  };
  
  // Handle connecting with a professional
  const handleConnect = (contactId: number) => {
    console.log(`Connecting with contact ${contactId}`);
    // In a real implementation, this would initiate a connection request
  };
  
  // Handle dismissing a recommendation
  const handleDismiss = (contactId: number) => {
    setMatches(matches.filter(match => match.id !== contactId));
  };
  
  // Handle feedback on a recommendation
  const handleFeedback = (contactId: number, isPositive: boolean, feedback?: string) => {
    console.log(`Feedback for contact ${contactId}: ${isPositive ? 'Positive' : 'Negative'}`);
    if (feedback) {
      console.log(`Feedback text: ${feedback}`);
    }
    // In a real implementation, this would send feedback to improve recommendations
  };
  
  // Toggle a filter
  const toggleFilter = (filterId: string) => {
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter(id => id !== filterId));
    } else {
      setActiveFilters([...activeFilters, filterId]);
    }
  };
  
  // Filter matches based on search query and active filters
  const filteredMatches = matches.filter(match => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesQuery = 
        match.name.toLowerCase().includes(query) ||
        match.profession.toLowerCase().includes(query) ||
        match.company.toLowerCase().includes(query) ||
        match.location.toLowerCase().includes(query) ||
        (match.specialties && match.specialties.some(s => s.toLowerCase().includes(query)));
      
      if (!matchesQuery) return false;
    }
    
    // Active filters (simplified for demo)
    if (activeFilters.length > 0) {
      // This is a simplified implementation
      // In a real app, you would check each filter category
      const matchesFilter = activeFilters.some(filter => {
        if (filter === 'estate_attorney') return match.profession === 'Estate Attorney';
        if (filter === 'cpa') return match.profession === 'CPA';
        if (filter === 'insurance_agent') return match.profession === 'Insurance Agent';
        if (filter === 'mortgage_broker') return match.profession === 'Mortgage Broker';
        if (filter === 'financial_advisor') return match.profession === 'Financial Advisor';
        
        if (filter === 'chicago') return match.location.includes('Chicago');
        if (filter === 'evanston') return match.location.includes('Evanston');
        if (filter === 'oak_park') return match.location.includes('Oak Park');
        
        if (filter === '90_plus') return match.matchScore >= 90;
        if (filter === '80_89') return match.matchScore >= 80 && match.matchScore < 90;
        if (filter === '70_79') return match.matchScore >= 70 && match.matchScore < 80;
        
        return false;
      });
      
      if (!matchesFilter && activeFilters.length > 0) return false;
    }
    
    return true;
  });
  
  return (
    <Layout>
      <div className="mb-6">
        <div className="flex items-center mb-6">
          <Link 
            href="/v2/dashboard" 
            className="mr-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Recommended Matches</h1>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="relative flex-grow max-w-2xl">
              <input
                type="text"
                placeholder="Search matches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${
                  showFilters || activeFilters.length > 0 
                    ? 'bg-blue-600 text-white' 
                    : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <FaFilter />
                <span>Filters</span>
                {activeFilters.length > 0 && (
                  <span className="ml-1 bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {activeFilters.length}
                  </span>
                )}
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1 text-gray-700">
                <FaSortAmountDown />
                <span>Sort</span>
              </button>
            </div>
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterCategories.map(category => (
                  <div key={category.id}>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">{category.name}</h3>
                    <div className="space-y-2">
                      {category.options.map(option => (
                        <label key={option.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={activeFilters.includes(option.id)}
                            onChange={() => toggleFilter(option.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{option.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={() => setActiveFilters([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Match Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start">
            <FaInfoCircle className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h2 className="text-sm font-medium text-gray-800">About Your Matches</h2>
              <p className="text-sm text-gray-600 mt-1">
                These recommendations are based on our professional services cross-referral grid, 
                geographic proximity, specialization alignment, and network analysis. Click "More detail" 
                on any match to see exactly why it was recommended.
              </p>
            </div>
          </div>
        </div>
        
        {/* Match Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMatches.map(match => (
            <RecommendationCard
              key={match.id}
              contact={match}
              matchFactors={matchFactorsMap[match.id as keyof typeof matchFactorsMap] || sampleMatchFactors}
              onSendReferral={handleSendReferral}
              onConnect={handleConnect}
              onDismiss={handleDismiss}
              onFeedback={handleFeedback}
            />
          ))}
          
          {filteredMatches.length === 0 && (
            <div className="col-span-2 bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <FaNetworkWired className="text-gray-400 text-4xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No matches found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || activeFilters.length > 0
                  ? 'Try adjusting your search or filters to see more results.'
                  : 'We couldn\'t find any matches for you at the moment.'}
              </p>
              {(searchQuery || activeFilters.length > 0) && (
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilters([]);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/v2/network"
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <FaNetworkWired />
            <span>View Network</span>
          </Link>
          
          <Link
            href="/v2/contacts"
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <FaUserPlus />
            <span>Add Contact</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
