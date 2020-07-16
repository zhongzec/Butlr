import { localDow } from 'helpers';
import moment from 'moment-timezone';

const todayOpen = (hours, timezone) => {
  const dow = localDow(timezone);
  const [{ h, m }] = hours && hours[dow];

  return moment()
    .tz(timezone)
    .hour(h)
    .minute(m)
    .second(0)
    .millisecond(0);
}

export {
  todayOpen
}