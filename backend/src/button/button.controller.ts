import { Router, Request } from 'express';
import { defaultRelays } from '../relays';

const router = Router();

router.all(
  '/',
  async (
    req: Request<
      unknown,
      unknown,
      unknown,
      { click: 'one' | 'two' | 'three' | 'long' | null }
    >,
    res
  ) => {
    const { click } = req.query;

    switch (click) {
      case 'one':
        console.log('Received request for one click.');
        await Promise.all(
          defaultRelays
            .findByTags(['bedroom'])
            .map(async (relay) => await relay.setState('toggle'))
        );
        break;
      case 'two':
        console.log('Received request for two clicks.');
        await Promise.all(
          defaultRelays
            .findByTags(['cozy'])
            .map(async (relay) => await relay.setState('toggle'))
        );
        break;
      case 'three':
        console.log('Received request for three clicks.');
        await Promise.all(
          defaultRelays
            .findByTags(['plant'])
            .map(async (relay) => await relay.setState('toggle'))
        );
        break;
      case 'long':
        console.log('Received request for long click.');
        await Promise.all(
          defaultRelays
            .findByTags(['lamp', 'plant'])
            .map(async (relay) => await relay.setState('off'))
        );
        break;
      default:
        console.log('Received request for unknown click.');
    }

    res.send('Hello world!');
  }
);

export const buttonController = router;
