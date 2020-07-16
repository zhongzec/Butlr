import moment from 'moment-timezone';

const localDateTime = (store) => (format) => {
  const dt = moment().tz(store.timezone);
  return format ? dt.format(format) : dt;
}

export {
  localDateTime
}