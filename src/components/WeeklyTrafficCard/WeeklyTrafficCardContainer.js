import React, { useContext, useEffect, useState } from 'react';
import { WeeklyTrafficCard } from './WeeklyTrafficCard';
import { AppContext } from 'contexts/App';
import { API_URL } from 'constants/index.js';
import { todayOpen, todayClose } from 'helpers';
import moment from 'moment';

const WeeklyTrafficCardContainer = (props) => {
  const { API } = useContext(AppContext);
  const { store = {} } = props;
  const [data, setData] = useState([]);
  const open = todayOpen(store.hours, store.timezone);
  const close = todayClose(store.hours, store.timezone);

  useEffect(() => {
    async function fetchData() {
      const start = moment()
        .tz(store.timezone)
        .subtract(7, 'day')
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .utc()
        .format('YYYY-MM-DD[T]HH:mm:ss[Z]');

      const result = await API.get(`${API_URL}/api/aggregates`, {
        params: {
          start,
          every: '1h',
          hourStart: 13,
          hourStop: 4
        },
      });

      setData([
        ...data,
        result && result.data && result.data.map(({ time, In, Out }) => {
          const dt = moment(time)
            .tz(store.timezone);

          // START REMOVAL

          // FIXME faking curves based on dow
          // const curves = [
          //   [0, 0, 0, 0, 0, 0, 1, 3, 4, 6, 8, 9, 10, 10, 10, 9, 8, 7, 6, 5, 0, 0, 0, 0], // sun
          //   [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 7, 7, 7, 6, 4, 0, 0, 0, 0], // mon
          //   [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 7, 7, 7, 6, 4, 0, 0, 0, 0], // tue
          //   [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 7, 7, 7, 6, 4, 0, 0, 0, 0], // wed
          //   [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 7, 7, 7, 6, 4, 0, 0, 0, 0], // thur
          //   [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 7, 7, 7, 6, 4, 0, 0, 0, 0], // fri
          //   [0, 0, 0, 0, 0, 0, 1, 3, 4, 6, 7, 7, 8, 9, 10, 9, 8, 7, 6, 5, 0, 0, 0, 0], // sat
          // ];
          // const dow = +dt.format('d'); // day of week (x-axis)
          // const hod = +dt.format('H'); // hour of day (y-axis)
          // const curve = curves[dow];
          // const k = +curve[hod] / 6.6; // chose 6.6 because it gave the best results

          // const v = k ? Math.floor(In * (k + 1) - Out) : 0;
          // END REMOVAL

          const v = In - Out // TODO enable when above is removed

          return {
            x: dt.format('YYYY-MM-DD'),
            y: dt.format('HH:MM:ss'),
            v,
            dt
          };
        }).filter(({ dt }) => {
          const hour = dt.hour();
          return hour > open.hour() && hour < close.hour();
        })
      ]);
    }

    fetchData();
  }, []);

  return <WeeklyTrafficCard {...props} data={data}/>
}

export {
  WeeklyTrafficCardContainer
}