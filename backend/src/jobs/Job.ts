import { v4 as uuid } from 'uuid';
import schedule from 'node-schedule';

import { Task } from '../tasks/Task';

export class Job {
  private id: string = uuid();
  private rule: schedule.RecurrenceSpecObjLit | undefined;
  private tasks: Task[] = [];
  private job: schedule.Job | undefined;

  setId(id: string) {
    this.id = id;
    return this;
  }

  getId() {
    return this.id;
  }

  setRule(rule: schedule.RecurrenceSpecObjLit) {
    this.rule = {
      hour: 0,
      minute: 0,
      second: 0,
      ...rule,
    };
    this.job?.cancel();
    this.job = schedule.scheduleJob(rule, () =>
      this.getTasks().forEach((task) => task.run())
    );
    return this;
  }

  getRule() {
    return this.rule;
  }

  addTask(task: Task) {
    this.tasks.push(task);
    return this;
  }

  getTasks() {
    return this.tasks;
  }

  cancelAllTasks() {
    this.job?.cancel();
    this.job = undefined;
    return this;
  }

  cancelTaskById(id: string) {
    this.tasks.filter((task) => task.getId() !== id);
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      rule: this.rule,
      tasks: this.tasks.map((task) => task.toJSON()),
    };
  }
}
