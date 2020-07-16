import moment from 'moment-timezone';

const localDow = (timezone) => {
  return moment()
    .tz(timezone)
    .format('d');
}

export {
  localDow
}