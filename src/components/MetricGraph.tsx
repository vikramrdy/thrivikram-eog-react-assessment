import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';

import moment from "moment";

import { IState } from '../store';
import { COLORS } from '../colors';

const UNITS: any = {
  "PSI": "y1",
  "%": "y2",
  "F": "y3",
}

export type Measurement = {
  at: any;
  metric: string;
  unit: string;
  value: number;
}

export type Metrics = {
  metric: string;
  measurements: Array<Measurement>;
};


const getMetricsData = (state: IState) => {
  return state.metrics;
};


const MetricGraph = () => {
  const { selectedMetricsWithMeasurements } = useSelector(getMetricsData);

  const data: Array<any> = selectedMetricsWithMeasurements.map((metric: any) => ({
    x: [...metric.measurements].map((m) => moment(m.at).format('h:mm:ss A')),
    y: [...metric.measurements].map((m) => m.value),
    name: metric.metric,
    yaxis: UNITS[metric.measurements[0].unit],
    type: 'scatter',
    mode: 'lines',
    line: { color: COLORS[metric.metric] },
  }));

  let range: Array<string> = [];

  if (selectedMetricsWithMeasurements.length) {
    const lastIndex = selectedMetricsWithMeasurements[0].measurements.length - 1;
    range = [moment(selectedMetricsWithMeasurements[0].measurements[0].at).format('h:mm A'), moment(selectedMetricsWithMeasurements[0].measurements[lastIndex].at).format('h:mm A')];
  }

  return (
    <Plot
      data={data}
      layout={{
        title: 'Metrics',
        width: 1400,
        height: 600,
        xaxis: { title: 'Time', dtick: 5 * 60, range, domain: [0.1, 0.9] },
        yaxis: {
          title: 'PSI',
          dtick: 200,
          titlefont: { color: '#1f77b4' },
          tickfont: { color: '#1f77b4' }
        },
        yaxis2: {
          title: '%',
          titlefont: { color: '#ff7f0e' },
          tickfont: { color: '#ff7f0e' },
          dtick: 10,
          anchor: 'free',
          overlaying: 'y',
          side: 'left'
        },
        yaxis3: {
          title: 'F',
          titlefont: { color: '#d62728' },
          tickfont: { color: '#d62728' },
          dtick: 200,
          anchor: 'x',
          overlaying: 'y',
          side: 'right'
        },
      }}
    />
  );
};

export default MetricGraph;
