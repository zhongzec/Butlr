const { InfluxDB } = require('@influxdata/influxdb-client');
const dotenv = require('dotenv');
dotenv.config();

const queryApi = new InfluxDB({
  url: process.env.INFLUXDB_URL,
  token: process.env.INFLUXDB_TOKEN
}).getQueryApi(process.env.INFLUXDB_ORG || '');

module.exports = function runQuery(fluxQuery, transform = true) {
  const result = transform ? {} : [];
  return new Promise((resolve, reject) => {
    queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        if (transform) {
          const {
            _field: field,
            _time: time,
            _value: value,
          } = tableMeta.toObject(row);
          result[time] = { ...(result[time] || {}), time, [field]: +value };
        } else {
          result.push(tableMeta.toObject(row));
        }
      },
      error(error) {
        reject(error);
      },
      complete() {
        if (transform) {
          resolve(Object.values(result));
        } else {
          resolve(result);
        }
      },
    });
  });
};
