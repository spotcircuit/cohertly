// Data from the v2 change document - cross referral grid
export const professionsList = [
  'Estate Planning Attorney',
  'Wealth Manager / Financial Advisor',
  'CPA',
  'Business Attorney',
  'Insurance Agent',
  'Mortgage Broker',
  'Commercial Realtor',
  'Residential Realtor',
  'Family Law Attorney',
  'Bankruptcy Attorney',
  'Business Consultant',
  'Elder Law Attorney',
  'Personal Injury Attorney',
  'IT Consultant'
];

// This data structure represents the cross-referral matrix from the v2 change document
// true means that the profession in the row receives referrals from the profession in the column
export const crossReferralMatrix: { [key: string]: { [key: string]: boolean } } = {
  'Estate Planning Attorney': {
    'Estate Planning Attorney': false,
    'Wealth Manager / Financial Advisor': true,
    'CPA': true,
    'Business Attorney': false,
    'Insurance Agent': true,
    'Mortgage Broker': false,
    'Commercial Realtor': true,
    'Residential Realtor': false,
    'Family Law Attorney': false,
    'Bankruptcy Attorney': false,
    'Business Consultant': true,
    'Elder Law Attorney': false,
    'Personal Injury Attorney': true,
    'IT Consultant': false
  },
  'Wealth Manager / Financial Advisor': {
    'Estate Planning Attorney': true,
    'Wealth Manager / Financial Advisor': false,
    'CPA': true,
    'Business Attorney': false,
    'Insurance Agent': true,
    'Mortgage Broker': true,
    'Commercial Realtor': false,
    'Residential Realtor': false,
    'Family Law Attorney': true,
    'Bankruptcy Attorney': false,
    'Business Consultant': true,
    'Elder Law Attorney': false,
    'Personal Injury Attorney': true,
    'IT Consultant': false
  },
  'CPA': {
    'Estate Planning Attorney': true,
    'Wealth Manager / Financial Advisor': true,
    'CPA': false,
    'Business Attorney': true,
    'Insurance Agent': true,
    'Mortgage Broker': true,
    'Commercial Realtor': true,
    'Residential Realtor': true,
    'Family Law Attorney': false,
    'Bankruptcy Attorney': true,
    'Business Consultant': true,
    'Elder Law Attorney': true,
    'Personal Injury Attorney': false,
    'IT Consultant': true
  },
  'Business Attorney': {
    'Estate Planning Attorney': false,
    'Wealth Manager / Financial Advisor': false,
    'CPA': true,
    'Business Attorney': false,
    'Insurance Agent': false,
    'Mortgage Broker': false,
    'Commercial Realtor': true,
    'Residential Realtor': false,
    'Family Law Attorney': false,
    'Bankruptcy Attorney': false,
    'Business Consultant': true,
    'Elder Law Attorney': false,
    'Personal Injury Attorney': false,
    'IT Consultant': true
  },
  'Insurance Agent': {
    'Estate Planning Attorney': true,
    'Wealth Manager / Financial Advisor': true,
    'CPA': true,
    'Business Attorney': false,
    'Insurance Agent': false,
    'Mortgage Broker': false,
    'Commercial Realtor': false,
    'Residential Realtor': false,
    'Family Law Attorney': false,
    'Bankruptcy Attorney': false,
    'Business Consultant': false,
    'Elder Law Attorney': false,
    'Personal Injury Attorney': false,
    'IT Consultant': false
  },
  'Mortgage Broker': {
    'Estate Planning Attorney': false,
    'Wealth Manager / Financial Advisor': true,
    'CPA': true,
    'Business Attorney': false,
    'Insurance Agent': false,
    'Mortgage Broker': false,
    'Commercial Realtor': false,
    'Residential Realtor': false,
    'Family Law Attorney': true,
    'Bankruptcy Attorney': false,
    'Business Consultant': false,
    'Elder Law Attorney': false,
    'Personal Injury Attorney': false,
    'IT Consultant': false
  },
  'Commercial Realtor': {
    'Estate Planning Attorney': false,
    'Wealth Manager / Financial Advisor': false,
    'CPA': true,
    'Business Attorney': true,
    'Insurance Agent': true,
    'Mortgage Broker': true,
    'Commercial Realtor': false,
    'Residential Realtor': false,
    'Family Law Attorney': false,
    'Bankruptcy Attorney': false,
    'Business Consultant': true,
    'Elder Law Attorney': false,
    'Personal Injury Attorney': false,
    'IT Consultant': true
  },
  'Residential Realtor': {
    'Estate Planning Attorney': false,
    'Wealth Manager / Financial Advisor': false,
    'CPA': true,
    'Business Attorney': false,
    'Insurance Agent': true,
    'Mortgage Broker': true,
    'Commercial Realtor': false,
    'Residential Realtor': false,
    'Family Law Attorney': false,
    'Bankruptcy Attorney': false,
    'Business Consultant': false,
    'Elder Law Attorney': false,
    'Personal Injury Attorney': false,
    'IT Consultant': false
  },
  'Family Law Attorney': {
    'Estate Planning Attorney': false,
    'Wealth Manager / Financial Advisor': false,
    'CPA': true,
    'Business Attorney': false,
    'Insurance Agent': false,
    'Mortgage Broker': false,
    'Commercial Realtor': false,
    'Residential Realtor': false,
    'Family Law Attorney': false,
    'Bankruptcy Attorney': false,
    'Business Consultant': false,
    'Elder Law Attorney': false,
    'Personal Injury Attorney': false,
    'IT Consultant': false
  },
  'Bankruptcy Attorney': {
    'Estate Planning Attorney': false,
    'Wealth Manager / Financial Advisor': false,
    'CPA': true,
    'Business Attorney': false,
    'Insurance Agent': false,
    'Mortgage Broker': false,
    'Commercial Realtor': false,
    'Residential Realtor': false,
    'Family Law Attorney': false,
    'Bankruptcy Attorney': false,
    'Business Consultant': false,
    'Elder Law Attorney': false,
    'Personal Injury Attorney': false,
    'IT Consultant': false
  },
  'Business Consultant': {
    'Estate Planning Attorney': false,
    'Wealth Manager / Financial Advisor': false,
    'CPA': true,
    'Business Attorney': true,
    'Insurance Agent': false,
    'Mortgage Broker': false,
    'Commercial Realtor': false,
    'Residential Realtor': false,
    'Family Law Attorney': false,
    'Bankruptcy Attorney': false,
    'Business Consultant': false,
    'Elder Law Attorney': false,
    'Personal Injury Attorney': false,
    'IT Consultant': true
  },
  'Elder Law Attorney': {
    'Estate Planning Attorney': true,
    'Wealth Manager / Financial Advisor': false,
    'CPA': true,
    'Business Attorney': false,
    'Insurance Agent': false,
    'Mortgage Broker': false,
    'Commercial Realtor': false,
    'Residential Realtor': false,
    'Family Law Attorney': false,
    'Bankruptcy Attorney': false,
    'Business Consultant': false,
    'Elder Law Attorney': false,
    'Personal Injury Attorney': false,
    'IT Consultant': false
  },
  'Personal Injury Attorney': {
    'Estate Planning Attorney': false,
    'Wealth Manager / Financial Advisor': false,
    'CPA': false,
    'Business Attorney': true,
    'Insurance Agent': false,
    'Mortgage Broker': false,
    'Commercial Realtor': false,
    'Residential Realtor': false,
    'Family Law Attorney': false,
    'Bankruptcy Attorney': false,
    'Business Consultant': false,
    'Elder Law Attorney': false,
    'Personal Injury Attorney': false,
    'IT Consultant': false
  },
  'IT Consultant': {
    'Estate Planning Attorney': false,
    'Wealth Manager / Financial Advisor': false,
    'CPA': true,
    'Business Attorney': true,
    'Insurance Agent': false,
    'Mortgage Broker': false,
    'Commercial Realtor': true,
    'Residential Realtor': false,
    'Family Law Attorney': false,
    'Bankruptcy Attorney': false,
    'Business Consultant': true,
    'Elder Law Attorney': false,
    'Personal Injury Attorney': false,
    'IT Consultant': false
  }
};

// Sample recommendation data for the dashboard
export const sampleRecommendations = [
  {
    id: '1',
    name: 'Sarah Williams',
    profession: 'Estate Planning Attorney',
    matchScore: 92,
    isNew: false,
    lastReferral: '2 weeks ago',
    mutualConnections: 3,
    factors: [
      {
        name: 'Professional Alignment',
        score: 9.5,
        description: 'Estate attorneys and wealth managers frequently exchange referrals',
        icon: "📈"
      },
      {
        name: 'Personal Affinity',
        score: 8.7,
        description: 'You have exchanged 7 referrals in the past year',
        icon: "🤝"
      },
      {
        name: 'Geographic Proximity',
        score: 9.2,
        description: 'Both serve clients in the same metro area',
        icon: "📍"
      }
    ]
  },
  {
    id: '2',
    name: 'Michael Chen',
    profession: 'CPA',
    matchScore: 89,
    isNew: false,
    lastReferral: '1 month ago',
    mutualConnections: 5,
    factors: [
      {
        name: 'Professional Alignment',
        score: 9.0,
        description: 'CPAs commonly refer to wealth managers',
        icon: "📈"
      },
      {
        name: 'Client Overlap',
        score: 8.5,
        description: '4 shared clients identified',
        icon: "👥"
      },
      {
        name: 'Engagement Rate',
        score: 8.2,
        description: 'Responsive to messages and referral requests',
        icon: "📱"
      }
    ]
  },
  {
    id: '3',
    name: 'Jessica Davis',
    profession: 'Insurance Agent',
    matchScore: 85,
    isNew: true,
    factors: [
      {
        name: 'Professional Alignment',
        score: 8.5,
        description: 'Insurance agents and financial advisors have strong referral potential',
        icon: "📈"
      },
      {
        name: 'Mutual Connections',
        score: 7.8,
        description: 'Connected through 2 shared partners',
        icon: "🔗"
      },
      {
        name: 'Client Needs',
        score: 8.0,
        description: 'Your clients often need insurance products',
        icon: "🎯"
      }
    ]
  }
];

// Sample new partner suggestions
export const sampleNetworkGrowthSuggestions = [
  {
    id: 'ng1',
    name: 'Robert Johnson',
    profession: 'Business Attorney',
    company: 'Johnson Legal Partners',
    matchScore: 88,
    source: 'peer-network',
    prequal: {
      reason: 'Referred by Michael Chen (CPA)',
      strength: 8
    }
  },
  {
    id: 'ng2',
    name: 'Amanda Torres',
    profession: 'Commercial Realtor',
    company: 'Premier Commercial Properties',
    matchScore: 82,
    source: 'ai-suggested',
    prequal: {
      reason: 'Strong match based on your client demographics',
      strength: 7
    }
  },
  {
    id: 'ng3',
    name: 'David Kim',
    profession: 'Elder Law Attorney',
    company: 'Kim Elder Law Group',
    matchScore: 79,
    source: 'external',
    prequal: {
      reason: '3 mutual connections in your extended network',
      strength: 6
    }
  }
];

// Enhanced meeting data with profile highlights
export const enhancedMeetings = [
  {
    id: 'm1',
    contact: 'Sarah Williams',
    contactId: 'c1',
    title: 'Discuss Referral Partnership',
    time: 'Today, 3:00 PM',
    type: 'virtual',
    zoomLink: 'https://zoom.us/j/123456789',
    highlightInfo: {
      type: 'expertise',
      value: 'Estate Planning for High Net Worth Clients'
    },
    notes: 'Estate Attorney with 8+ years experience, specializes in high net worth clients'
  },
  {
    id: 'm2',
    contact: 'Michael Chen',
    contactId: 'c2',
    title: 'Quarterly Referral Review',
    time: 'Tomorrow, 11:00 AM',
    type: 'in-person',
    location: 'Starbucks on Main St',
    highlightInfo: {
      type: 'lastReferral',
      value: 'Sent Robert Johnson last month'
    },
    notes: 'CPA, sent 5 referrals last quarter, discuss tax planning opportunities'
  },
  {
    id: 'm3',
    contact: 'Jessica Davis',
    contactId: 'c3',
    title: 'Introduction Meeting',
    time: 'May 10, 2:30 PM',
    type: 'virtual',
    zoomLink: 'https://zoom.us/j/987654321',
    highlightInfo: {
      type: 'potentialValue',
      value: '$15,000 in projected annual referrals'
    },
    notes: 'Insurance Agent, potential new referral partner, 92% match score'
  }
];
