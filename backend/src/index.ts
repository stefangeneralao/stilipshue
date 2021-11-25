import express, { Request, Response } from 'express';
import cors from 'cors';
import config from '../config';
import Job from './Job';
import { jobs } from './JobsPreset';
import { ShellyRelayState } from './ShellyRelay';
import { shellyRelays } from './ShellyRelays';
import Tasks, { TTasks } from './Tasks';

try {
  const duplicates = config.relays
    .map(({ name }) => name)
    .filter((item, index, arr) => arr.indexOf(item) != index);

  if (duplicates.length > 0) {
    throw new Error(`Duplicate names in relay list: ${duplicates[0]}.`);
  }
} catch (e: any) {
  console.error(e.message);
  process.exit();
}

console.log('Starting server.');
const app = express();
app.use(express.json());
app.use(cors());

app.post(
  '/jobs',
  (
    req: Request<
      null,
      null,
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
        const devices = shellyRelays.findByName(deviceName);
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

app.get('/jobs', (_, res) => {
  console.log('Received request for all jobs.');
  res.status(200).send(jobs.toJSON());
});

app.all(
  '/devices/relays',
  async (
    req: Request<
      {},
      {},
      {},
      { state: ShellyRelayState; nameSearch: string; id: string }
    >,
    res
  ) => {
    console.log('Received request for /devices/relays.');

    const { nameSearch, state, id } = req.query;

    try {
      if (!state) {
        throw new Error('No relay state provided.');
      }

      if (nameSearch && id) {
        throw new Error('Cannot search by both name and id.');
      }

      if (id) {
        const device = shellyRelays.findById(id);
        if (!device) {
          throw new Error(`Relay with id ${id} not found.`);
        }
        device.setState(state);
        res.status(200).send(await device.toJSON());
        return;
      }

      if (nameSearch) {
        const devices = shellyRelays.findByName(nameSearch);

        if (devices.length === 0) {
          throw new Error(`Could not find relay with name ${nameSearch}.`);
        }

        devices.forEach((relay) => {
          relay.setState(state);
        });
        res.status(200).send(devices.map((device) => device.getName()));
      } else {
        shellyRelays.getAll().forEach((device) => {
          device.setState(state);
        });
        res.sendStatus(200);
      }
    } catch (e: any) {
      console.error(e);
      if (e.message) {
        res.status(400).send(e.message);
      } else {
        res.status(500).send(e);
      }
    }
  }
);

app.get('/devices', async (_, res) => {
  console.log('Received request for all devices.');
  const devices = await shellyRelays.toJSON();
  res.send(devices);
});

app.get('/tasks', (_, res) => {
  console.log('Received request for all tasks.');
  res.send(Tasks.toJSON());
});

const port = config.serverPort;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
