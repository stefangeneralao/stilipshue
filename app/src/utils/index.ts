import moment from 'moment';

export const parseTaskRule = ({
  hour,
  minute,
  second,
}: {
  hour: number;
  minute: number;
  second: number;
}) =>
  moment({
    hour,
    minute,
    second,
  }).format('HH:mm:ss');

export const apiUrl = process.env.API_URL || 'http://localhost:3001';
