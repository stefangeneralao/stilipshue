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
    address: 'http://192.168.0.7:4001',
    name: 'Plant shelf',
    tags: ['plant', 'hallway'],
  },
  {
    address: 'http://192.168.0.36',
    name: 'Window christmas lamp',
    tags: ['window', 'lamp', 'cozy'],
  },
  {
    address: 'http://192.168.0.42',
    name: 'LED string',
    tags: ['window', 'lamp', 'cozy'],
  },
  { address: 'http://192.168.0.37', name: 'Heater', tags: ['heater'] },
];

const serverPort = 3001;

const config: Config = {
  relays,
  serverPort,
};

export default config;
