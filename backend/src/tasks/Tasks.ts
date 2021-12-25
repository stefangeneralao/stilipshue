import { TurnOffRelayTask, TurnOnRelayTask } from './Task';

export const allTasks = {
  turnOnRelay: TurnOnRelayTask,
  turnOffRelay: TurnOffRelayTask,
} as const;

export type TTasks = 'turnOnRelay' | 'turnOffRelay';

export class Tasks {
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
