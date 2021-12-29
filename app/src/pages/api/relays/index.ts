import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Relay } from '~/types/relay';
import { apiUrl } from '~/utils';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Relay[]>
) {
  try {
    const { data } = await axios.get<Relay[]>(`${apiUrl}/relays`);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}
