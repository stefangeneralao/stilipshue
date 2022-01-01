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

// Endpoint for setting the state of multiple relays.
router.all(
  '/',
  async (
    req: Request<{}, {}, {}, { state?: RelayState; tags?: string }>,
    res
  ) => {
    try {
      const { state, tags } = req.query;
      console.log(req.query);

      const devices = await (async () => {
        if (tags) {
          console.log('Received request for relays with tags.');
          const tagsArray = tags.split(',');
          return defaultRelays.findByTags(tagsArray);
        } else {
          console.log('Received request for all relays.');
          return defaultRelays.getAll();
        }
      })();

      if (state) {
        const newState = await (async () => {
          if (state === 'toggle') {
            const [firstDevice] = devices;
            if (!firstDevice) return state;

            return (await firstDevice.getState()) === 'on' ? 'off' : 'on';
          }

          return state;
        })();

        await Promise.all(devices.map((device) => device.setState(newState)));
      }

      res.send(await Promise.all(devices.map((device) => device.toJSON())));
    } catch {
      res.status(500).send('An error occurred.');
    }
  }
);

export const relaysController = router;
