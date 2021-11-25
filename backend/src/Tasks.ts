import { TurnOffShellyRelay, TurnOnShellyRelay, Task } from './Task';

export const allTasks = {
  turnOnShellyRelay: TurnOnShellyRelay,
  turnOffShellyRelay: TurnOffShellyRelay,
} as const;

export type TTasks = 'turnOnShellyRelay' | 'turnOffShellyRelay';

export default class Tasks {
  static getAllTasks() {
    return allTasks;
  }

  static toJSON() {
    return Object.keys(allTasks);
  }

  static getTaskByKey(key: TTasks) {
    return allTasks[key];
  }
}
