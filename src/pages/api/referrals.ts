import type { NextApiRequest, NextApiResponse } from 'next';
import { mockReferrals } from '../../utils/mock';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(mockReferrals);
  }
  if (req.method === 'POST') {
    // TODO: proxy to supabase
    return res.status(201).json({ message: 'Created (mock)' });
  }
  res.setHeader('Allow', ['GET','POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
