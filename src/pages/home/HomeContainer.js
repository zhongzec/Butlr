import React, { useEffect, useState, useContext } from 'react';
import Home from './Home';
import { localDateTime } from 'helpers';
import { AppContext } from 'contexts/App';
import { API_URL } from 'constants/index.js';
import { todayOpen, todayClose } from 'helpers';
import moment from 'moment';

const store = {
  id: '8cbbd8e9-4257-49ec-828e-798b3f4007ba',
  name: 'Demo Store',
  hours: [
    // NOTE: hours 0-23
    // [open, close]
    [{ h: 6, m: 30 }, { h: 20, m: 0 }], // Su
    [{ h: 6, m: 30 }, { h: 20, m: 0 }], // Mo
    [{ h: 6, m: 30 }, { h: 20, m: 0 }], // Tu
    [{ h: 6, m: 30 }, { h: 20, m: 0 }], // We
    [{ h: 6, m: 30 }, { h: 20, m: 0 }], // Th
    [{ h: 6, m: 30 }, { h: 20, m: 0 }], // Fr
    [{ h: 6, m: 30 }, { h: 20, m: 0 }], // Sa
  ],
  openingTime: { h: 6, m: 30 }, // store local time // legacy, deprecated
  closingTime: { h: 20, m: 0 }, // store local time // legacy, deprecated
  timezone: 'America/Los_Angeles',
  capacity: 200,
  firstDayOfWeek: 0,
}

const isOpen = () => {
  const dateTime = localDateTime(store);
  const open = todayOpen(store.hours, store.timezone);
  const close = todayClose(store.hours, store.timezone);

  return dateTime()
    .isBetween(open, close);
}

const getOccupancy = async (store, open, API) => {
  if (!open) {
    return 0;
  }

  const { hours, timezone } = store;
  const start = todayOpen(hours, timezone).utc().format();
  const { data } = await API.get(`${API_URL}/api/counts`, {
    params: {
      start,
      sum: true,
    }
  });

  // check response
  if (Array.isArray(data) && data.length > 0) {
    const [res] = data;
    return res.In - res.Out;
  }
  return 0;
}

const getFlux = async (timeframe, open, API) => {
  if (!open) {
    return {
      entrances: 0,
      exits: 0
    }
  }

  const { val, unit } = timeframe;
  const unitAbbrev = {
    hours: 'h',
    minutes: 'm',
    seconds: 's',
    days: 'd',
    months: 'mo',
    weeks: 'w',
  }[unit] || unit[0];

  const timeAgo = `-${val}${unitAbbrev}`;
  const { data } = await API.get(`${API_URL}/api/counts`, {
    params: {
      start: timeAgo,
      sum: true,
    },
  });

  // check response
  if (Array.isArray(data) && data.length > 0) {
    const [res] = data;
    return {
      entrances: res.In,
      exits: res.Out,
    };
  }
  return {
    entrances: 0,
    exits: 0,
  };
}

const HomeContainer = () => {
  const { API } = useContext(AppContext);
  const [data, setData] = useState({
    store,
    timeframe: {
      val: 30,
      unit: 'minutes',
    },
    dailyStart: new Date(),
    dailyEnd: new Date(),
    weeklyStart: moment().startOf('week'),
    weeklyEnd: moment().endOf('week'),
    search: '',
    occupancy: 0,
    entrances: 0,
    exits: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const open = isOpen();
      const [occupancy, { entrances, exits }] = await Promise.all([
        getOccupancy(store, open, API),
        getFlux(data.timeframe, open, API)
      ]);

      setData({
        ...data,
        occupancy,
        entrances,
        exits
      });
    }

    fetchData();

    // update every 5s
    const interval = setInterval(() => fetchData(), 5000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <Home {...data}/>
  )
};

export default HomeContainer;