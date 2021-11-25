import Job from './Job';
import { Jobs } from './Jobs';
import { shellyRelays } from './ShellyRelays';
import Tasks from './Tasks';

const [bedroom1, bedroom2] = shellyRelays.findByName('bedroom');
const [christmas] = shellyRelays.findByName('christmas');
const [plant] = shellyRelays.findByName('plant');
const [heating] = shellyRelays.findByName('heating');

export const jobs = new Jobs()
  .addJob(
    new Job()
      .setId('turn on heating')
      .setRule({ hour: 6, minute: 30 })
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(heating))
  )
  .addJob(
    new Job()
      .setId('lights on')
      .setRule({ hour: 7, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(bedroom1))
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(bedroom2))
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(christmas))
      .addTask(new (Tasks.getAllTasks().turnOnShellyRelay)(plant))
  )
  .addJob(
    new Job()
      .setId('turn off heating')
      .setRule({ hour: 8, minute: 30 })
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(heating))
  )
  .addJob(
    new Job()
      .setId('turn off plant lamp')
      .setRule({ hour: 18, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(plant))
  )
  .addJob(
    new Job()
      .setId('lights off')
      .setRule({ hour: 22, minute: 0 })
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(bedroom1))
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(bedroom2))
      .addTask(new (Tasks.getAllTasks().turnOffShellyRelay)(christmas))
  );
