-- Insert mock users
INSERT INTO users (name, email, industry) VALUES
('Alice Attorney', 'alice@lawfirm.com', 'Legal'),
('Bob Broker',   'bob@mortgage.com', 'Finance'),
('Carol CPA',    'carol@accounting.com', 'Accounting'),
('Dave Dev',     'dave@devshop.com', 'Tech');

-- Example referral
INSERT INTO referrals (sender_id, receiver_id, client_name, notes) 
VALUES ((SELECT id FROM users WHERE email='alice@lawfirm.com'),
        (SELECT id FROM users WHERE email='carol@accounting.com'),
        'Jane Doe', 'Need tax advice');
