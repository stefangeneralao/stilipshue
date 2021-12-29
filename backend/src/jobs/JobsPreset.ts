import { Job } from './Job';
import { Jobs } from './Jobs';
import { defaultRelays } from '../relays';
import { Tasks } from '../tasks/Tasks';

const [bedroom1, bedroom2] = defaultRelays.findByName('bedroom');
const [christmas] = defaultRelays.findByName('christmas');
const [windowPlant] = defaultRelays.findByName('window plant');
const [plantShelf] = defaultRelays.findByName('plant shelf');
const [heater] = defaultRelays.findByName('heater');
const [ledString] = defaultRelays.findByName('led string');

export const jobs = new Jobs()
  .addJob(
    new Job()
      .setId('heater on')
      .setRule({ hour: 5, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(heater))
  )
  .addJob(
    new Job()
      .setId('plant lamps on')
      .setRule({ hour: 6, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(windowPlant))
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(plantShelf))
  )
  .addJob(
    new Job()
      .setId('lights on')
      .setRule({ hour: 6, minute: 30 })
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(bedroom1))
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(bedroom2))
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(christmas))
      .addTask(new (Tasks.getAllTasks().turnOnRelay)(ledString))
  )
  .addJob(
    new Job()
      .setId('plant lamps off')
      .setRule({ hour: 18, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(windowPlant))
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(plantShelf))
  )
  .addJob(
    new Job()
      .setId('heater off')
      .setRule({ hour: 20, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(heater))
  )
  .addJob(
    new Job()
      .setId('bed lights off')
      .setRule({ hour: 22, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(bedroom1))
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(bedroom2))
  )
  .addJob(
    new Job()
      .setId('christmas lights off')
      .setRule({ hour: 23, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(christmas))
      .addTask(new (Tasks.getAllTasks().turnOffRelay)(ledString))
  );
