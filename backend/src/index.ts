import express from 'express';
import cors from 'cors';
import config from '../config';
import { jobsController } from './jobs/jobs.controller';
import { relaysController } from './relays/relays.controller';
import { tasksController } from './tasks/tasks.controller';
import { buttonController } from './button/button.controller';
import { verifyConfig } from './utils/verify';
// import { connect } from '././database';

// connect();

try {
  verifyConfig(config);
  console.log('Config verified.');
} catch (e: any) {
  console.error(e.message);
  process.exit();
}

console.log('Starting server.');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/jobs', jobsController);
app.use('/relays', relaysController);
app.use('/tasks', tasksController);
app.use('/button', buttonController);

app.get('/', (req, res) => {
  res.send(new Date().toLocaleString());
});

const port = config.serverPort;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
