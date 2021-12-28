import { Job } from './Job';

export class Jobs {
  private jobs: { [key: string]: Job } = {};

  addJob(job: Job) {
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
      job.cancel();
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
