export type ShellyRelayState = 'on' | 'off' | 'toggle';

export type ShellyRelayNetworkState = ShellyRelayState | 'pending' | 'failed';

export interface Device {
  name: string;
  state: ShellyRelayState;
  id: string;
}
