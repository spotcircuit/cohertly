import { Referral, Match, User } from '../types';

// Enhanced mock user data with more detailed profiles
export const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'David Miller', 
    email: 'david@millerwealthadvisors.com', 
    industry: 'Financial Planning'
  },
  { 
    id: '2', 
    name: 'Jessica Thompson', 
    email: 'jthompson@legacylaw.com', 
    industry: 'Legal'
  },
  { 
    id: '3', 
    name: 'Michael Chen', 
    email: 'mchen@chenaccounting.com', 
    industry: 'Accounting'
  },
  { 
    id: '4', 
    name: 'Sarah Johnson', 
    email: 'sjohnson@premierinsurance.com', 
    industry: 'Insurance'
  },
  { 
    id: '5', 
    name: 'Robert Wilson', 
    email: 'rwilson@wilsonrealty.com', 
    industry: 'Real Estate'
  },
  { 
    id: '6', 
    name: 'Lisa Rodriguez', 
    email: 'lrodriguez@businessadvisors.com', 
    industry: 'Business Consulting'
  },
  { 
    id: '7', 
    name: 'Andrew Clark', 
    email: 'aclark@clarkcapital.com', 
    industry: 'Investment Banking'
  },
];

// Enhanced mock referrals with more detailed information
export const mockReferrals: Referral[] = [
  { 
    id: 'r1', 
    sender_id: '1', 
    receiver_id: '3', 
    client_name: 'Jane Doe', 
    notes: 'Looking for comprehensive tax planning services for her small business. Needs help with quarterly estimated taxes and potential deductions.', 
    status: 'pending', 
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() 
  },
  { 
    id: 'r2', 
    sender_id: '1', 
    receiver_id: '2', 
    client_name: 'Thomas Wright', 
    notes: 'Needs estate planning services. Recently inherited significant assets and wants to ensure proper distribution to heirs.', 
    status: 'completed', 
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() 
  },
  { 
    id: 'r3', 
    sender_id: '2', 
    receiver_id: '1', 
    client_name: 'Maria Garcia', 
    notes: 'Interested in retirement planning. Currently 55 and wants to retire in 5-7 years. Needs comprehensive financial review.', 
    status: 'in_progress', 
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() 
  },
];

// Enhanced mock matches with detailed AI-generated notes
export const mockMatches: Match[] = [
  {
    id: 'm1',
    user_id: '1',
    partner_id: '2',
    score: 95,
    ai_notes: "High compatibility based on complementary services. Jessica's estate planning expertise pairs well with your financial planning services.",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'm2',
    user_id: '1',
    partner_id: '7',
    score: 92,
    ai_notes: "Andrew's investment expertise complements your financial planning services. His focus on high-net-worth clients aligns with your client base.",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'm3',
    user_id: '1',
    partner_id: '3',
    score: 88,
    ai_notes: "Michael's tax specialization creates strong synergy with your financial planning services. His expertise in small business accounting complements your work with business owner clients.",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'm4',
    user_id: '1',
    partner_id: '4',
    score: 85,
    ai_notes: "Sarah's insurance expertise fills a gap in your service offerings. Her focus on life insurance and long-term care aligns with the needs of your retirement planning clients.",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'm5',
    user_id: '1',
    partner_id: '5',
    score: 82,
    ai_notes: "Robert's commercial real estate expertise offers investment diversification opportunities for your clients. His long-term growth approach aligns with your wealth building strategies.",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'm6',
    user_id: '1',
    partner_id: '6',
    score: 78,
    ai_notes: "Lisa's business consulting expertise complements your work with business owner clients. Her succession planning focus aligns with your retirement and estate planning services.",
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
  },
];
