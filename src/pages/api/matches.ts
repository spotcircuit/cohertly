import type { NextApiRequest, NextApiResponse } from 'next';
import { mockMatches } from '../../utils/mock';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: replace mock with aiMatch logic
  res.status(200).json(mockMatches);
}
