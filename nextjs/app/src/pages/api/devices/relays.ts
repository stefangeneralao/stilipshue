import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Relay } from '~/types/relay';

const API_URL = process.env.API_URL || 'http://localhost:3001';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Relay[]>
) {
  try {
    const { data } = await axios.get<Relay[]>(`${API_URL}/devices/relays`);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}
