import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Jobs } from '~/types/jobs';
import { apiUrl } from '~/utils';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await axios.get<Jobs>(`${apiUrl}/jobs`);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
}
