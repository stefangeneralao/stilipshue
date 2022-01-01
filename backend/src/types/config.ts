export interface Relay {
  name: string;
  address: string;
  tags: string[];
}

export interface Config {
  relays: Relay[];
  serverPort: number;
}
