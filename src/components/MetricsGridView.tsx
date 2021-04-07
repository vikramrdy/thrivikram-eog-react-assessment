/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Theme,
  GridList,
  GridListTile,
  GridListTileBar,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import { IState } from '../store';
import { COLORS } from '../colors';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "100%",
      margin: "20px !important",
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    tile: {
      width: '15% !important',
      margin: 10,
      padding: "0px !important",
      backgroundColor: "palevioletred"
    },
  }),
);

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

const getMetricsData = (state: IState) => {
  return state.metrics;
};

const MetricsGridView = () => {
  const classes = useStyles();

  const { selectedMetricsWithMeasurements } = useSelector(getMetricsData);

  return (
    <div className={classes.root}>
      <GridList cellHeight={100} spacing={16} className={classes.gridList}>
        {selectedMetricsWithMeasurements.map((metricObj: Metrics) =>
          <GridListTile classes={{ root: classes.tile }} style={{ backgroundColor: COLORS[metricObj.metric] }} key={metricObj.metric}>
            <p style={{ textAlign: "center", verticalAlign: "middle" }}>{metricObj.metric}</p>
            <GridListTileBar title={metricObj.measurements[metricObj.measurements.length - 1].value} />
          </GridListTile>
        )}
      </GridList>
    </div>
  );
};

export default MetricsGridView;
