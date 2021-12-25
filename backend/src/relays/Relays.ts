import { Relay } from './Relay';
import config from '../../config';

export class Relays {
  private readonly relays: Relay[] = [];

  addRelay(address: string, name: string) {
    this.relays.push(new Relay(address, name));
    return this;
  }

  findAll(callback: (relay: Relay) => boolean): Relay[] {
    return this.relays.filter(callback);
  }

  findById(id: string): Relay | undefined {
    return this.relays.find((relay) => relay.getId() === id);
  }

  findByName(name: string): Relay[] {
    return this.findAll((relay) => relay.getName().includes(name));
  }

  getAll() {
    return this.relays;
  }

  async toJSON() {
    return Promise.all(this.relays.map((relay) => relay.toJSON()));
  }
}

export const defaultRelays = new Relays();
config.relays.forEach((relay) =>
  defaultRelays.addRelay(relay.address, relay.name)
);
