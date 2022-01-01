import moment from 'moment';
import { TaskRule } from '~/types/taskRule';

export const taskRuleToString = ({ hour, minute, second }: TaskRule) =>
  moment({
    hour,
    minute,
    second,
  }).format('HH:mm:ss');

export const parseTaskRule = (rule: string): TaskRule => {
  try {
    const [hour, minute, second] = rule.split(':').map(Number);
    return { hour: hour || 0, minute: minute || 0, second: second || 0 };
  } catch {
    throw new Error('Invalid task rule. Must be in format "HH:mm:ss".');
  }
};

export const apiUrl = process.env.API_URL || 'http://localhost:3001';
