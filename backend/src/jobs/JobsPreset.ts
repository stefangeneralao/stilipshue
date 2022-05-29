import { Job } from './Job';
import { Jobs } from './Jobs';
import { defaultRelays } from '../relays';
import { Tasks } from '../tasks/Tasks';

const [bedroom1, bedroom2] = defaultRelays.findByTags(['bedroom']);
const [windowPlant, plantShelf] = defaultRelays.findByTags(['plant']);
const [mushroom] = defaultRelays.findByTags(['mushroom']);
const [ledString] = defaultRelays.findByTags(['led-string']);
const [heater] = defaultRelays.findByTags(['heater']);

export const jobs = new Jobs()
  .addJob(
    new Job()
      .setId('Heater on')
      .setRule({ hour: 5, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(heater))
  )
  .addJob(
    new Job()
      .setId('Plant lamps on')
      .setRule({ hour: 6, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(windowPlant))
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(plantShelf))
  )
  .addJob(
    new Job()
      .setId('Lights on')
      .setRule({ hour: 6, minute: 30 })
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
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(plantShelf))
  )
  .addJob(
    new Job()
      .setId('Heater off')
      .setRule({ hour: 20, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(heater))
  )
  .addJob(
    new Job()
      .setId('Mushroom light off')
      .setRule({ hour: 22, minute: 0 })
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
