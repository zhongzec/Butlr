import React from 'react';
import { Avatar } from 'components/Avatar';
import { Search } from 'components/Search';
import { CurrentTrafficCard } from 'components/CurrentTrafficCard';
import { DailyTrafficCardContainer } from 'components/DailyTrafficCard';
import { WeeklyTrafficCardContainer } from 'components/WeeklyTrafficCard';
import './Home.css';

const Home = (props) => {
  const {
    timeframe,
    dailyStart,
    dailyEnd,
    weeklyStart,
    weeklyEnd,
    search,
    occupancy,
    entrances,
    exits,
    store,
  } = props;

  return (
    <div className="Home">
      <div className="flex flex-row justify-between items-start">
        <Avatar/>
        <Search/>
      </div>

      <div className="Cards">
        <CurrentTrafficCard
          capacity={store && store.capacity}
          occupancy={occupancy}
          entrances={entrances}
          exits={exits}
          timeframe={timeframe && timeframe.val}
          unit={timeframe && timeframe.unit}
        />

        <DailyTrafficCardContainer
          start={dailyStart}
          end={dailyEnd}
          capacity={store && store.capacity}
          occupancy={occupancy}
          store={store}
        />

        <WeeklyTrafficCardContainer
          store={store}
          start={weeklyStart}
          end={weeklyEnd}
        />
      </div>
    </div>
  )
}

export default Home;