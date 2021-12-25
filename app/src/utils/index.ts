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
