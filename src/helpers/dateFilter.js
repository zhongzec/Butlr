import moment from 'moment';

const dateFilter = (v, outputFormat = 'D MM YYYY', inputFormat = 'YYYY-MM-DD') => moment(v, inputFormat).format(outputFormat)

export {
  dateFilter
}