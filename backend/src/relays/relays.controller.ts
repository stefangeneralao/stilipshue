import { Router, Request } from 'express';

import { RelayState } from './Relay';
import { defaultRelays } from './Relays';

const router = Router();

// Endpoint for setting the state of a relay.
router.all(
  '/:id',
  async (req: Request<{ id: string }, {}, {}, { state?: RelayState }>, res) => {
    console.log(`Received request for relay ${req.params.id}.`);

    const { id } = req.params;
    const { state } = req.query;

    try {
      if (!id) {
        throw new Error('No relay id provided.');
      }

      if (!state) {
        throw new Error('No state provided.');
      }

      const device = defaultRelays.findById(id);
      if (device) {
        console.log(`Found relay "${device.getName()}".`);
      } else {
        console.log(`Could not find relay with id "${id}".`);
        throw new Error(`Could not find relay with id ${id}.`);
      }

      await device.setState(state);
      res.status(200).send(await device.toJSON());
      return;
    } catch (e: any) {
      res.status(500).send(e);
    }
  }
);

router.get('/', async (_, res) => {
  console.log('Received request for all devices.');
  try {
    const devices = await defaultRelays.toJSON();
    res.send(devices);
  } catch {
    res.status(500).send('Failed to get relays.');
  }
});

export const relaysController = router;
