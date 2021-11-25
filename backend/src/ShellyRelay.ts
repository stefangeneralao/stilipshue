import axios from 'axios';
import { v4 as uuid } from 'uuid';

export type ShellyRelayState = 'on' | 'off' | 'toggle';

export default class ShellyRelay {
  private readonly id: string = uuid();
  private address: string;
  private name: string;

  constructor(address: string, name: string) {
    this.address = address;
    this.name = name;
  }

  async getState(): Promise<ShellyRelayState> {
    try {
      console.log(`Getting state of ${this.address}.`);
      const { data } = await axios.get<{ relays: { ison: boolean }[] }>(
        `${this.address}/status`
      );
      const state = data.relays[0].ison ? 'on' : 'off';
      return state;
    } catch {
      throw new Error(`Could not get relay state of ${this.address}.`);
    }
  }

  async setState(state: ShellyRelayState) {
    try {
      console.log(`Setting state of ${this.address} to ${state}.`);
      axios.post(`${this.address}/relay/0?turn=${state}`);
    } catch {
      throw new Error(
        `Could not set relay state of ${this.address} to ${state}.`
      );
    }
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  async toJSON() {
    const state = await this.getState();
    return {
      name: this.name,
      id: this.id,
      state,
    };
  }
}
