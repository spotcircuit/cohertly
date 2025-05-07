export interface User {
  id: string;
  name: string;
  email: string;
  industry: string;
}

export interface Referral {
  id: string;
  sender_id: string;
  receiver_id: string;
  client_name: string;
  notes?: string;
  status: string;
  created_at: string;
}

export interface Match {
  id: string;
  user_id: string;
  partner_id: string;
  score: number;
  ai_notes: string;
  created_at: string;
}
