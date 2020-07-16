import React, { useEffect } from 'react';
import Chart from 'chart.js';
import { Card } from 'components/Card';
import { localDateTime, dateFilter } from 'helpers';

const red = '#644DFF';
const purple = '#F73F64';

const DailyTrafficCard = (props) => {
  const { store, capacity, data } = props;
  const lastSevenDays = Array(7)
    .fill()
    .map((_, i) => {
      const localdate = localDateTime(store);
      return localdate()
        .subtract(i, 'day')
        .format('YYYY-MM-DD');
    });

  useEffect(() => {
    const ctx = document && document.querySelector('#daily-traffic-chart');
    if (!ctx) {
      return;
    }

    const bar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          data: data[0],
          barThickness: 13,
          backgroundColor: (ctx) => {
            const idx = ctx && ctx.dataIndex;
            const val = ctx && ctx.dataset && ctx.dataset.data && ctx.dataset.data[idx];
            return val < 200 ? purple : red;
          }
        }]
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            type: 'time',
            offset: true,
            time: {
              unit: 'hour',
              displayFormats: {
                hour: 'HH',
              },
            },
            ticks: {},
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
            gridLines: {
              display: true,
            },
            ticks: {
              beginAtZero: true,
              min: 0,
              max: capacity,
            },
          }],
        },
      }
    });
  }, [data, capacity]);

  return (
    <Card
      classname="DailyTrafficCard"
      icon={<span><i className="icon-user"/></span>}
      title={<h3>Daily Traffic Analytics</h3>}>
      <div className="daily">
        <div className="daily-head p-4 text-center">
          <select className="py-2 px-3">
            {lastSevenDays.map(date => (
              <option key={date} value={date}>{dateFilter(date, 'dddd')}</option>
            ))}
          </select>
        </div>

        <div className="px-8">
          {data && data.length > 0 && (
            <canvas width="250" id="daily-traffic-chart"></canvas>
          )}
        </div>
      </div>
    </Card>
  )
}

export {
  DailyTrafficCard
}