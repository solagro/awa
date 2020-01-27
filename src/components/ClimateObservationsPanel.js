import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import CustomDataTable from './CustomDataTable';

const contents = [
  {
    id: 'averageTemperatureAnnual',
    label: 'Average Temperature Annual',
  },
  {
    id: 'averageTemperatureSeasonal',
    label: 'Average Temperature Seasonal',
  },
  {
    id: 'hydricDeficitAnnual',
    label: 'Hydric Deficit Annual',
  },
  {
    id: 'hydricDeficitSeasonal',
    label: 'Hydric Deficit Seasonal',
  },
  {
    id: 'precipitationsAnnual',
    label: 'Precipitations Annual',
  },
  {
    id: 'precipitationsSeasonal',
    label: 'Precipitations Seasonal',
  },
  {
    id: 'estivalDays',
    label: 'Estival Days',
  },
  {
    id: 'frozenDays',
    label: 'Frozen Days',
  },
];
const useStyles = makeStyles(theme => ({
  section__title: {
    color: theme.palette.primary.main,
    fontSize: '1rem',
  },
}));

const ClimateObservationsPanel = ({ currentDataType, data }) => {
  const classes = useStyles();
  return (
    contents.map(content =>
      content.id.includes(currentDataType) && (
      <div key={content.id}>
        <h3 className={classes.section__title}>{content.label}</h3>
        <CustomDataTable
          data={data}
        />
      </div>
      ))
  );
};

export default ClimateObservationsPanel;
