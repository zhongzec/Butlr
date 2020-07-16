import React, { useEffect } from 'react';
import './CurrentTrafficCard.css';
import { Card } from 'components/Card';
import Chart from 'chart.js';

const CurrentTrafficCard = (props) => {
  const { capacity, occupancy, entrances, timeframe, exits } = props;

  useEffect(() => {
    const ctx = document && document.querySelector('#current-traffic-chart');
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          data: [occupancy, capacity - occupancy],
          backgroundColor: (ctx) => {
            const idx = ctx.dataIndex;
            if (idx === 0) {
              return ctx.dataset.data[idx] < capacity
                ? '#644DFF'
                : '#F73F64';
            }
            return '#e5e5e5';
          }
        }]
      },
      options: {
        circumference: Math.PI,
        rotation: -Math.PI,
        cutoutPercentage: 70,
        // responsive: true,
        // maintainAspectRatio: false,
        animation: {
          duration: 0,
        }
      }
    });
  }, [occupancy, capacity]);

  return (
    <Card
      classname="CurrentTrafficCard"
      icon={<span><i className="icon-graph"/></span>}
      title={<h3>Current Traffic Mapping</h3>}>
      <div className="current flex flex-col">
        <div className="current-head flex flex-row justify-between">
          <div className="current-head-left">
            <h4>In Store</h4>
            Capacity: {capacity}
          </div>
          <div className="current-head-right">
            {occupancy}
          </div>
        </div>

        <div className="viz">
          <div className="flex">
            <div className="self-end">
              <span>0</span>
            </div>
            <div className="viz__chart">
              <canvas width="400" id="current-traffic-chart"></canvas>
            </div>
            <div className="self-end">
              <span>{capacity}</span>
            </div>
          </div>
          <div className="occupancy__info mr-4">
            <div className="occupancy__value">
              {occupancy}
            </div>
            <div className="occupancy__label mb-10">
              current occupancy level
            </div>
            <div className="occupancy__status">
              <span>Within Capacity</span>
            </div>
          </div>
        </div>

        <div className="current-foot">
          <h4>Insights</h4>
          <div className="font-light">
            {entrances} entrances in the last {timeframe} minutes
          </div>
          <div className="font-light">
            {exits} exits in the last {timeframe} minutes
          </div>
        </div>
      </div>
    </Card>
  )
}

export {
  CurrentTrafficCard
}