export type Relay = {
  id: string;
  name: string;
  state: RelayState;
};

export type RelayState = 'on' | 'off' | 'unknown';
