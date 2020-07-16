const runQuery = require('./run-query');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function count(start, end = null, sum = false) {
  const fluxQuery = [
    // data source
    `from(bucket:"${process.env.BUCKET}")`,

    // time range
    end ? `|> range(start: ${start}, stop: ${end})` : `|> range(start: ${start})`,

    // filters
    '|> filter(fn: (r) => r._measurement == "headcount")',

    // sum or yield
    sum ? '|> sum()' : '|> yield()',
  ].join(' ');

  console.log(fluxQuery);
  return runQuery(fluxQuery);
};
