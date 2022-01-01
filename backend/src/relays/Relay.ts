import axios from 'axios';
import { v4 as uuid } from 'uuid';

export type RelayState = 'on' | 'off' | 'toggle' | 'unknown';

export class Relay {
  private readonly id: string = uuid();
  private address: string;
  private name: string;
  private tags: string[] = [];

  constructor(address: string, name: string, tags: string[]) {
    this.address = address;
    this.name = name;
    this.tags = tags;
  }

  async getState(): Promise<RelayState> {
    try {
      console.log(`Attempting to get state of "${this.name}".`);
      const { data } = await axios.get<{ relays: { ison: boolean }[] }>(
        `${this.address}/status`,
        {
          timeout: 1000,
        }
      );
      console.log(`Successfully got state of "${this.name}".`);
      const state = data.relays[0].ison ? 'on' : 'off';
      return state;
    } catch {
      console.log(`Could not get state of "${this.name}".`);
      return 'unknown';
    }
  }

  async setState(state: RelayState) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        console.log(`Attempting to set state of "${this.name}" to ${state}.`);
        const timeout = setTimeout(() => {
          console.log(
            `Timed out while setting state of "${this.name}" to ${state}.`
          );
          reject(
            `Timed out while setting state of "${this.name}" to ${state}.`
          );
        }, 1000);
        await axios.post(`${this.address}/relay/0?turn=${state}`);
        clearTimeout(timeout);
        console.log(`Successfully set state of "${this.name}" to ${state}.`);
        resolve();
      } catch {
        console.log(`Could not set state of "${this.name}" to ${state}.`);
        reject(`Could not set relay state of "${this.name}" to ${state}.`);
      }
    });
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getTags() {
    return this.tags;
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
