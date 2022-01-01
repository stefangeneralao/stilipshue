import { Relay } from './Relay';
import { Relay as RelayType } from '../types/config';
import config from '../../config';

export class Relays {
  private readonly relays: Relay[] = [];

  addRelay(address: string, name: string, tags: string[]) {
    this.relays.push(new Relay(address, name, tags));
    return this;
  }

  find(callback: (relay: Relay) => boolean): Relay[] {
    return this.relays.filter(callback);
  }

  findById(id: string): Relay | undefined {
    return this.relays.find((relay) => relay.getId() === id);
  }

  findByName(name: string): Relay[] {
    return this.find((relay) =>
      relay.getName().toLowerCase().includes(name.toLowerCase())
    );
  }

  findByTags(tags: string[]): Relay[] {
    return this.find((relay) =>
      tags.some((tag) => relay.getTags().includes(tag))
    );
  }

  getAll() {
    return this.relays;
  }

  async toJSON() {
    return Promise.all(this.relays.map((relay) => relay.toJSON()));
  }
}

export const defaultRelays = new Relays();
config.relays.forEach((relay: RelayType) =>
  defaultRelays.addRelay(relay.address, relay.name, relay.tags)
);
