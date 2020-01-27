import React from 'react';
import { useTranslation } from 'react-i18next';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppBar } from '@material-ui/core';

const links = [
  {
    id: 'averageTemperature',
    label: 'Average Temperature',
    path: 'average-temperature',
  },
  {
    id: 'hydricDeficit',
    label: 'Hydric Deficit',
    path: 'hydric-deficit',
  },
  {
    id: 'precipitations',
    label: 'Precipitations',
    path: 'precipitations',
  },
  {
    id: 'estivalDays',
    label: 'Estival Days',
    path: 'estivalDays',
  },
  {
    id: 'frozenDays',
    label: 'Frozen Days',
    path: 'frozenDays',
  },
];
const SecondaryTabs = withStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  flexContainer: {
    marginBottom: theme.spacing(0),
  },
  indicator: {
    backgroundColor: 'red',
    width: 90,
  },
}))(props => <Tabs {...props} centered indicatorColor="secondary" />);

const SecondaryTab = withStyles(theme => ({
  root: {
    fontSize: '.8rem',
    textTransform: 'none',
    maxWidth: 90,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '&:hover': {
      fontWeight: 700,
      opacity: 1,
    },
    '&$selected': {
      color: '#000',
      fontWeight: 700,
      opacity: 1,
      borderBottom: '1px solid #dca817',
    },
    '&:focus': {
      color: '#000',
      fontWeight: 700,
      opacity: 1,
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const ClimateObservationsTabs = ({ handleChange }) => {
  const { t } = useTranslation();
  return (
    <SecondaryTabs value={links} onChange={handleChange}>
      {links.map(({ id, label }) => (
        <SecondaryTab
          key={id}
          label={t(label)} // i18next-extract-disable-line
          value={id}
        />
      ))}
    </SecondaryTabs>
  );
};

export default ClimateObservationsTabs;
