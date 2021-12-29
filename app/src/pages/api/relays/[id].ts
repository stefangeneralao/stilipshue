import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Relay } from '~/types/relay';
import { apiUrl } from '~/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Relay>
) {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const { data } = await axios.post<Relay>(`${apiUrl}/relays/${id}`);
        res.status(200).json(data);
      } catch (err: any) {
        res.status(500).send(err.message);
      }
      break;

    case 'PATCH':
      try {
        const { state } = req.body;

        if (!state) {
          throw new Error('Missing state');
        }

        const { data } = await axios.post<Relay>(
          `${apiUrl}/relays/${id}?state=${state}`
        );
        res.status(200).json(data);
      } catch (err: any) {
        res.status(500).send(err.message);
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PATCH']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
