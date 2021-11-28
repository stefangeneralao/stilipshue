import Job from './Job';
import { Jobs } from './Jobs';
import { shellyRelays } from './ShellyRelays';
import Tasks from './Tasks';

const [bedroom1, bedroom2] = shellyRelays.findByName('bedroom');
const [christmas] = shellyRelays.findByName('christmas');
const [windowPlant] = shellyRelays.findByName('window plant');
const [plantShelf] = shellyRelays.findByName('plant shelf');

export const jobs = new Jobs()
  .addJob(
    new Job()
      .setId('lights on')
      .setRule({ hour: 7, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(bedroom1))
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(bedroom2))
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(christmas))
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(windowPlant))
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(plantShelf))
  )
  .addJob(new Job().setId('turn off heating').setRule({ hour: 8, minute: 30 }))
  .addJob(
    new Job()
      .setId('turn off plant lamp')
      .setRule({ hour: 18, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(windowPlant))
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(plantShelf))
  )
  .addJob(
    new Job()
      .setId('lights off')
      .setRule({ hour: 22, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(bedroom1))
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(bedroom2))
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(christmas))
  );
