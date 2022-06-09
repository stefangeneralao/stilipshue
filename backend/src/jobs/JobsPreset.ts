import { Job } from './Job';
import { Jobs } from './Jobs';
import { defaultRelays } from '../relays';
import { Tasks } from '../tasks/Tasks';

const [bedroom1, bedroom2] = defaultRelays.findByTags(['bedroom']);
const [windowPlant] = defaultRelays.findByTags(['plant']);
const [mushroom] = defaultRelays.findByTags(['mushroom']);
const [ledString] = defaultRelays.findByTags(['led-string']);

export const jobs = new Jobs()
  .addJob(
    new Job()
      .setId('Plant lamps on')
      .setRule({ hour: 6, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(windowPlant))
  )
  .addJob(
    new Job()
      .setId('Lights on')
      .setRule({ hour: 7, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(bedroom1))
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(bedroom2))
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(mushroom))
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(ledString))
  )
  .addJob(
    new Job()
      .setId('Plant lamps off')
      .setRule({ hour: 18, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(windowPlant))
  )
  .addJob(
    new Job()
      .setId('Mushroom light off')
      .setRule({ hour: 21, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(mushroom))
  )
  .addJob(
    new Job()
      .setId('Cozy lights off')
      .setRule({ hour: 23, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(bedroom1))
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(bedroom2))
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(ledString))
  );
