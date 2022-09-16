import { Config, Relay } from './src/types/config';

const relays: Relay[] = [
  {
    address: 'http://192.168.0.29',
    name: 'Bedroom lamp 1',
    tags: ['bedroom', 'lamp'],
  },
  {
    address: 'http://192.168.0.28',
    name: 'Bedroom lamp 2',
    tags: ['bedroom', 'lamp'],
  },
  {
    address: 'http://192.168.0.30',
    name: 'Window plant lamp',
    tags: ['window', 'plant', 'lamp'],
  },
  {
    address: 'http://192.168.0.42',
    name: 'LED string',
    tags: ['window', 'cozy', 'lamp', 'led-string'],
  },
  {
    address: 'http://192.168.0.46',
    name: 'Mushroom lamp',
    tags: ['mushroom', 'cozy', 'lamp'],
  },
  {
    address: 'http://192.168.0.37',
    name: 'Miner',
    tags: [],
  },
];

const serverPort = 3001;

const config: Config = {
  relays,
  serverPort,
};

export default config;
