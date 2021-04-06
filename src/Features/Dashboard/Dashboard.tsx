import { Paper, Grid, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'urql';

import SelectMetrics from '../../components/SelectMetrics';
import MetricsGridView from '../../components/MetricsGridView';
import { actions } from './reducer';
import MetricGraph from '../../components/MetricGraph';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  root: {
    margin: 20,
    height: '100%',
  },
});

const query = `query ($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
    value
    metric
    unit
       }
       }
  }
`;

const currentDateTimeStamp = new Date().getTime();
const timeStampBefore30Minutes = Math.floor((currentDateTimeStamp - 30 * 60 * 1000) / 1000.0);

const Dashboard = () => {
  const [metrics, setMetrics] = useState([] as Array<{ title: String }>);
  const classes = useStyles();

  const inputVariables = metrics.map((m) => ({ metricName: m.title, after: timeStampBefore30Minutes }));

  const dispatch = useDispatch();

  const [result] = useQuery({
    query,
    variables: { input: inputVariables },
  });

  const { data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements } = data;
    dispatch(actions.metricsApiDataRecevied(getMultipleMeasurements));
  }, [dispatch, data, error]);

  return (
    <div className={classes.root}>
      <Grid direction="column" container>
        <Grid item>
          <SelectMetrics onChange={(values: Array<{ title: String }>) => setMetrics(values)} />
        </Grid>
        <Grid item>
        <MetricsGridView />
        </Grid>
        <Grid item>
          <Paper elevation={1}>
            <MetricGraph />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;