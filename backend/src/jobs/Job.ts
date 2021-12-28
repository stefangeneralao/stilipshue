import { v4 as uuid } from 'uuid';
import schedule from 'node-schedule';

import { Task } from '../tasks/Task';

export class Job {
  private id: string = uuid();
  private rule: schedule.RecurrenceSpecObjLit | undefined;
  private tasks: Task[] = [];
  private job: schedule.Job | undefined;
  private skipOnce: boolean = false;

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
    this.cancel();
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

  cancel() {
    this.job?.cancel();
    this.job = undefined;
    return this;
  }

  cancelTaskById(id: string) {
    this.tasks.filter((task) => task.getId() !== id);
    return this;
  }

  setSkipOnce(skipOnce: boolean) {
    if (!this.rule || !this.job) {
      this.skipOnce = false;
      return;
    }

    if (skipOnce) {
      this.cancel();
      this.skipOnce = true;

      this.job = schedule.scheduleJob(this.rule, () => {
        this.setSkipOnce(false);
      });
    } else {
      this.cancel();
      this.skipOnce = false;

      this.job = schedule.scheduleJob(this.rule, () =>
        this.getTasks().forEach((task) => task.run())
      );
    }
  }

  getSkipOnce() {
    return this.skipOnce;
  }

  executeTasks() {
    this.getTasks().forEach((task) => task.run());
  }

  toJSON() {
    return {
      id: this.id,
      rule: this.rule,
      tasks: this.tasks.map((task) => task.toJSON()),
      skipOnce: this.skipOnce,
    };
  }
}
