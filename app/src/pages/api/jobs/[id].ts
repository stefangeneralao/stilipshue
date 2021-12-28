import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Jobs } from '~/types/jobs';

const API_URL = process.env.API_URL || 'http://localhost:3001';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const { skipOnce, executeNow } = req.body;

    const { data } = await axios.patch<Jobs>(`${API_URL}/jobs/${id}`, {
      skipOnce,
      executeNow,
    });
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
}
