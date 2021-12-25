import { v4 as uuid } from 'uuid';

import { Relay } from '../relays';

export abstract class Task {
  private id: string;
  private name: string;
  private callback: () => void;

  constructor(name: string, callback: () => void) {
    this.id = uuid();
    this.name = name;
    this.callback = callback;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  run() {
    this.callback();
    return this;
  }
}

abstract class RelayTask extends Task {
  private relay: Relay;

  constructor(relay: Relay, name: string, callback: () => void) {
    super(name, callback);

    this.relay = relay;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      device: this.relay.getName(),
    };
  }
}

export class TurnOnRelayTask extends RelayTask {
  constructor(relay: Relay, name: string = 'Turn on') {
    super(relay, name, () => relay.setState('on'));
  }
}

export class TurnOffRelayTask extends RelayTask {
  constructor(relay: Relay, name: string = 'Turn off') {
    super(relay, name, () => relay.setState('off'));
  }
}
