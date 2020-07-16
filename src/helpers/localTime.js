import moment from 'moment-timezone';

const localTime = (timezone) => {
  return moment()
    .tz(timezone)
    .format('HH:MM:ss');
}

export {
  localTime
}