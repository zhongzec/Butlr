import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from 'contexts/App';
import { DailyTrafficCard } from './DailyTrafficCard';
import { API_URL } from 'constants/index.js';
import moment from 'moment';

const DailyTrafficCardContainer = (props) => {
  const { API } = useContext(AppContext);
  const { store } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await API.get(`${API_URL}/api/aggregates`, {
        params: {
          start: '-12h',
          every: '1h',
        },
      });

      setData([
        ...data,
        result && result.data && result.data.map(({ time, In, Out }) => ({
          x: moment(time)
            .tz(store.timezone)
            .format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
          y: In - Out
        }))
      ]);
    }

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000)

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <DailyTrafficCard {...props} data={data}/>
}

export {
  DailyTrafficCardContainer
}