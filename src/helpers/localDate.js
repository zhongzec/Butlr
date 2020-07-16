import moment from 'moment-timezone';

const localDate = (timezone) => {
  return moment()
    .tz(timezone)
    .format('YYYY-MM-DD');
}

export {
  localDate
}