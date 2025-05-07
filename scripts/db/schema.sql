-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  industry text,
  created_at timestamp with time zone DEFAULT now()
);

-- Referrals table
CREATE TABLE referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES users(id),
  receiver_id uuid REFERENCES users(id),
  client_name text NOT NULL,
  notes text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now()
);

-- Matches table (AI suggestions)
CREATE TABLE matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  partner_id uuid REFERENCES users(id),
  score int,
  ai_notes text,
  created_at timestamp with time zone DEFAULT now()
);
