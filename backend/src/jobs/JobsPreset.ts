import { Job } from './Job';
import { Jobs } from './Jobs';
import { defaultRelays } from '../relays';
import { TurnOffRelayTask, TurnOnRelayTask } from '../tasks/Task';

const [bedroom1, bedroom2] = defaultRelays.findByTags(['bedroom']);
const [windowPlant] = defaultRelays.findByTags(['plant']);
const [mushroom] = defaultRelays.findByTags(['mushroom']);
const [ledString] = defaultRelays.findByTags(['led-string']);
const [miner] = defaultRelays.findByName('miner');

const jobs = new Jobs()
  .addJob(
    new Job()
      .setId('Miner on')
      .setRule({ hour: 6, minute: 0 })
      .addTask(new TurnOnRelayTask(miner))
  )
  .addJob(
    new Job()
      .setId('Plant lamps on')
      .setRule({ hour: 6, minute: 0 })
      .addTask(new TurnOnRelayTask(windowPlant))
  )
  .addJob(
    new Job()
      .setId('Lights on')
      .setRule({ hour: 7, minute: 0 })
      .addTask(new TurnOnRelayTask(bedroom1))
      .addTask(new TurnOnRelayTask(bedroom2))
      .addTask(new TurnOnRelayTask(mushroom))
      .addTask(new TurnOnRelayTask(ledString))
  )
  .addJob(
    new Job()
      .setId('Plant lamps off')
      .setRule({ hour: 18, minute: 0 })
      .addTask(new TurnOffRelayTask(windowPlant))
  )
  .addJob(
    new Job()
      .setId('Mushroom light off')
      .setRule({ hour: 18, minute: 0 })
      .addTask(new TurnOffRelayTask(mushroom))
  )
  .addJob(
    new Job()
      .setId('Bedroom lights off')
      .setRule({ hour: 21, minute: 0 })
      .addTask(new TurnOffRelayTask(bedroom1))
      .addTask(new TurnOffRelayTask(bedroom2))
  )
  .addJob(
    new Job()
      .setId('Cozy lights off')
      .setRule({ hour: 23, minute: 0 })
      .addTask(new TurnOffRelayTask(ledString))
  );

export { jobs };
