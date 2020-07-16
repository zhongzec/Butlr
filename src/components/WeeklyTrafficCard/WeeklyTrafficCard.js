import React, { useEffect } from 'react';
import { Card } from 'components/Card';
import { dateFilter } from 'helpers';
import Chart from 'chart.js';
import 'chartjs-chart-matrix';
import chroma from 'chroma-js'

const WeeklyTrafficCard = (props) => {
  const { start, end, data, store } = props;
  const capacity = store && store.capacity;

  useEffect(() => {
    const element = document && document.querySelector('#weekly-traffic-chart');
    if (!element) {
      return;
    }

    const chart = new Chart(element, {
      type: 'matrix',
      data: {
        datasets: [{
          label: 'My Matrix',
          data: data[0],
          backgroundColor: (ctx) => {
            const value = ctx.dataset.data[ctx.dataIndex].v;

            const lilac = '#a297f8';
            const purple = '#644dff';
            const red = '#f73f64';
            const black = '#000000';

            const colors = chroma
              .scale([
                '#eae7fd',
                lilac,
                purple,
                red,
              ])
              .colors(32);

            const colorIdx = Math.max(Math.floor((value / capacity) * colors.length), 0);
            return colors[colorIdx] || black;
          },
          width: 13, // px
          height: (ctx) => {
            const a = ctx.chart.chartArea;
            return (a.bottom - a.top) / 17;
          },
        }],
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            title: () => { return ''; },
            // eslint-disable-next-line
            label: (item, data) => {
              const v = data.datasets[item.datasetIndex].data[item.index];
              return [`x: ${v.x}`, `y: ${v.y}`, `v: ${v.v}`];
            },
          },
        },
        scales: {
          xAxes: [{
            type: 'time',
            offset: true,
            time: {
              unit: 'day',
              displayFormats: {
                day: 'dd',
              },
            },
            ticks: {
            },
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
            type: 'time',
            // position: 'right',
            // labels: ['08:00', '12:00', '16:00'],
            labels: [
              // '00:00', // even
              // // '01:00', // odd
              // '02:00', // even
              // // '03:00', // odd
              // '04:00', // even
              // // '05:00', // odd
              '06:00', // even
              '07:00', // odd
              '08:00', // even
              '09:00', // odd
              '10:00', // even
              '11:00', // odd
              '12:00', // even
              '13:00', // odd
              '14:00', // even
              '15:00', // odd
              '16:00', // even
              '17:00', // odd
              '18:00', // even
              '19:00', // odd
              '20:00', // even
              '21:00', // odd
              // '22:00', // even
              // '23:00', // odd
            ],
            time: {
              unit: 'hour',
              parser: 'HH:mm',
              displayFormats: {
                hour: 'HH',
              },
            },
            ticks: {
              source: 'labels',
              reverse: true,
            },
            gridLines: {
              display: false,
            },
          }],
        },
      },
    });
  }, [data]);

  return (
    <Card
      classname="WeeklyTrafficCard"
      icon={<span><i className="icon-user"/></span>}
      title={<h3>Weekly Traffic Analytics</h3>}
      subtitle={<h5 className="font-light text-muted">{`${start.format('D MM YYYY')} - ${end.format('D MM YYYY')}`}</h5>}
    >
      <div className="weekly">
        <div className="weekly-head p-4 text-center">
          <select className="py-2 px-3">
            <option value="03/12/20 - 03/19/20">
              03/12/20 - 03/19/20
            </option>
          </select>
        </div>
        <div className="viz px-16">
          {data && data.length > 0 && (
            <canvas width="400" height="400" id="weekly-traffic-chart"></canvas>
          )}
        </div>
      </div>
    </Card>
  )
}

export {
  WeeklyTrafficCard
}