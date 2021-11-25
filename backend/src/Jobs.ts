import Job from './Job';
import { shellyRelays } from './ShellyRelays';
import Tasks from './Tasks';
export class Jobs {
  private jobs: { [key: string]: Job } = {};

  addJob(job: Job) {
    console.log(`Setting job for ${job.getId()}.`);
    this.cancelJobById(job.getId());
    this.jobs[job.getId()] = job;
    return this;
  }

  toJSON() {
    return Object.values(this.jobs).reduce((acc, job) => {
      const { id, ...restJob } = job.toJSON();
      return {
        ...acc,
        [job.getId()]: restJob,
      };
    }, {});
  }

  getJobById(id: string) {
    return this.jobs[id];
  }

  cancelJobById(id: string) {
    const job = this.getJobById(id);
    if (job) {
      job.cancelAllTasks();
      delete this.jobs[id];
    }
    return this;
  }

  cancelAllJobs() {
    Object.keys(this.jobs).forEach((id) => {
      this.cancelJobById(id);
    });
    return this;
  }
}
