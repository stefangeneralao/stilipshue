import { Router } from 'express';
import { Tasks } from './Tasks';

const router = Router();

router.get('/tasks', (_, res) => {
  console.log('Received request for all tasks.');
  try {
    res.send(Tasks.toJSON());
  } catch {
    res.status(500).send('Failed to get tasks.');
  }
});

export const tasksController = router;
