import Job from './Job';
import { Jobs } from './Jobs';
import { shellyRelays } from './ShellyRelays';
import Tasks from './Tasks';

const [bedroom1, bedroom2] = shellyRelays.findByName('bedroom');
const [christmas] = shellyRelays.findByName('christmas');
const [windowPlant] = shellyRelays.findByName('window plant');
const [plantShelf] = shellyRelays.findByName('plant shelf');
const [heater] = shellyRelays.findByName('heater');
const [ledString] = shellyRelays.findByName('led string');

export const jobs = new Jobs()
  .addJob(
    new Job()
      .setId('heater on')
      .setRule({ hour: 5, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(heater))
  )
  .addJob(
    new Job()
      .setId('lights on')
      .setRule({ hour: 6, minute: 30 })
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(bedroom1))
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(bedroom2))
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(christmas))
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(windowPlant))
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(plantShelf))
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(ledString))
  )
  .addJob(
    new Job()
      .setId('turn off plant lamp')
      .setRule({ hour: 18, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(windowPlant))
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(plantShelf))
  )
  .addJob(
    new Job()
      .setId('heater off')
      .setRule({ hour: 22, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(heater))
  )
  .addJob(
    new Job()
      .setId('bed lights off')
      .setRule({ hour: 22, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(bedroom1))
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(bedroom2))
  )
  .addJob(
    new Job()
      .setId('christmas lights off')
      .setRule({ hour: 23, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(christmas))
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(ledString))
  );

