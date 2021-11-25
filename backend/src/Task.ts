import { v4 as uuid } from 'uuid';
import ShellyRelay from './ShellyRelay';

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

abstract class ShellyTask extends Task {
  private shellyRelay: ShellyRelay;

  constructor(shellyRelay: ShellyRelay, name: string, callback: () => void) {
    super(name, callback);

    console.log('ShellyRelay', shellyRelay);

    this.shellyRelay = shellyRelay;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      device: this.shellyRelay.getName(),
    };
  }
}

export class TurnOnShellyRelay extends ShellyTask {
  constructor(shellyRelay: ShellyRelay, name: string = 'Turn on Shelly Relay') {
    super(shellyRelay, name, () => shellyRelay.setState('on'));
  }
}

export class TurnOffShellyRelay extends ShellyTask {
  constructor(
    shellyRelay: ShellyRelay,
    name: string = 'Turn off Shelly Relay'
  ) {
    super(shellyRelay, name, () => shellyRelay.setState('off'));
  }
}
