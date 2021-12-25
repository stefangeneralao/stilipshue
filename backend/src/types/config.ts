export interface Relay {
  name: string;
  address: string;
}

export interface Button {
  name: string;
  address: string;
}

export interface Sensor {
  name: string;
  address: string;
}

export interface Config {
  relays: Relay[];
  serverPort: number;
  buttons: Button[];
  sensors: Sensor[];
}
