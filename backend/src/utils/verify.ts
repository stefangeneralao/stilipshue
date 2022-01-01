import { Config, Relay } from '../types/config';
import { TaskRule } from '../types/rule';

const verifyConfigKeys = (config: Config) => {
  const configKeys = Object.keys(config);
  const expectedConfigKeys = ['relays', 'serverPort', 'buttons', 'sensors'];

  const hasAllConfigKeys =
    configKeys.length === expectedConfigKeys.length &&
    configKeys.every((key) => expectedConfigKeys.includes(key));

  if (!hasAllConfigKeys) {
    throw new Error(
      `Invalid config.js, must contain ${expectedConfigKeys.join(', ')}.`
    );
  }
};

const verifyRelaysConfig = (relays: Relay[]) => {
  if (!Array.isArray(relays)) {
    throw new Error('Invalid config.js, relays must be an array.');
  }

  const hasAllProperties = relays.every((relay) => {
    const relayKeys = Object.keys(relay);
    const expectedRelayKeys = ['name', 'address'];

    return (
      relayKeys.length === expectedRelayKeys.length &&
      relayKeys.every((key) => expectedRelayKeys.includes(key))
    );
  });

  if (!hasAllProperties) {
    throw new Error(
      'Invalid config.js, relays must contain name and address properties.'
    );
  }

  const hasDuplicateNames =
    relays
      .map(({ name }) => name)
      .filter((item, index, arr) => arr.indexOf(item) != index).length > 0;
  if (hasDuplicateNames) {
    throw new Error('Invalid config.js, relays must have unique names.');
  }
};

const verifyServerPort = (port: number) => {
  if (Number.isNaN(port)) {
    throw new Error('Invalid config.js, serverPort must be a number.');
  }
};

export const verifyConfig = (config: Config) => {
  verifyConfigKeys(config);
  verifyRelaysConfig(config.relays);
  verifyServerPort(config.serverPort);
};

export const instanceOfTaskRule = (object: any): object is TaskRule =>
  'hour' in object &&
  'minute' in object &&
  'second' in object &&
  typeof object.hour === 'number' &&
  typeof object.minute === 'number' &&
  typeof object.second === 'number';
