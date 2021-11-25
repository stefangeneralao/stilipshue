import ShellyRelay from './ShellyRelay';
import config from '../config';

export class ShellyRelays {
  private readonly relays: ShellyRelay[] = [];

  addRelay(address: string, name: string) {
    this.relays.push(new ShellyRelay(address, name));
    return this;
  }

  findAll(callback: (relay: ShellyRelay) => boolean): ShellyRelay[] {
    return this.relays.filter(callback);
  }

  findById(id: string): ShellyRelay | undefined {
    return this.relays.find((relay) => relay.getId() === id);
  }

  findByName(name: string): ShellyRelay[] {
    return this.findAll((relay) => relay.getName().includes(name));
  }

  getAll() {
    return this.relays;
  }

  async toJSON() {
    return Promise.all(this.relays.map((relay) => relay.toJSON()));
  }
}

export const shellyRelays = new ShellyRelays();
config.relays.forEach((relay) =>
  shellyRelays.addRelay(relay.address, relay.name)
);
