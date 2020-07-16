const runQuery = require('./run-query');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function aggregate(start = '-7d', end = null, every = '1d') {
  const fluxQuery = [
    // data source
    `from(bucket:"${process.env.BUCKET}")`,

    // time range
    end ? `|> range(start: ${start}, stop: ${end})` : `|> range(start: ${start})`,

    // filters
    '|> filter(fn: (r) => r._measurement == "headcount")',

    `|> aggregateWindow(every: ${every}, fn: sum)`,
  ].join(' ');
  console.log(fluxQuery);
  return runQuery(fluxQuery);
};
