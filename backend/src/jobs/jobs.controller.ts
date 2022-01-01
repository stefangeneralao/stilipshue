import { Router, Request, Response } from 'express';

import { Job } from './Job';
import { jobs } from './JobsPreset';
import { TTasks, Tasks } from '../tasks/Tasks';
import { defaultRelays } from '../relays';
import { TaskRule } from '../types/rule';
import { instanceOfTaskRule } from '../utils/verify';

const router = Router();

router.post(
  '/',
  (
    req: Request<
      null,
      unknown,
      {
        id?: string;
        rule?: {
          hour: number;
          minute: number;
          second: number;
        };
        tasks?: [
          {
            taskName: TTasks;
            deviceName: string;
          }
        ];
      }
    >,
    res: Response
  ) => {
    console.log('Received request for job.');
    const { id, rule, tasks } = req.body;

    const newJob = new Job();
    if (id) {
      newJob.setId(id);
    }
    if (rule) {
      newJob.setRule(rule);
    }
    if (tasks) {
      tasks.forEach(({ taskName, deviceName }) => {
        const devices = defaultRelays.findByName(deviceName);
        const Task = Tasks.getTaskByKey(taskName);

        devices.forEach((device) => {
          newJob.addTask(new Task(device));
        });
      });
    }

    jobs.addJob(newJob);

    res.status(200).send(jobs.toJSON());
  }
);

router.get('/', (_, res) => {
  console.log('Received request for all jobs.');
  res.status(200).send(jobs.toJSON());
});

router.patch(
  '/:id',
  (
    req: Request<
      { id: string },
      unknown,
      { skipOnce?: boolean; executeNow?: boolean; rule?: TaskRule }
    >,
    res
  ) => {
    console.log('Received request to update job.');
    const { id } = req.params;
    const { skipOnce, executeNow, rule } = req.body;

    const job = jobs.getJobById(id);

    if (!job) {
      res.status(404).send('Job not found.');
      return;
    }

    if (typeof skipOnce === 'boolean') {
      console.log('Setting skipOnce to', skipOnce);
      job.setSkipOnce(skipOnce);
    }

    if (typeof executeNow === 'boolean' || executeNow) {
      console.log('Executing all tasks now.');
      job.executeTasks();
    }

    if (instanceOfTaskRule(rule)) {
      console.log('Setting rule to', rule);
      job.setRule(rule);
    }

    res.status(200).send(job.toJSON());
  }
);

export const jobsController = router;
