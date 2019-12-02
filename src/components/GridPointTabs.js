import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Link from './Link';
import withModalContext from '../hoc/withModalRoutingContext';

const links = [
  {
    path: 'yield-compilation',
    id: 'yieldCompilation',
    label: 'Yield compilation',
  },
  {
    path: 'climate-observations',
    id: 'climateObservations',
    label: 'Climate observations',
  },
  {
    path: 'climate-projections',
    id: 'climateProjections',
    label: 'Climate projections',
  },
];

const GridPointTabs = ({ sourceType, gridCode, modalProps: { modal } }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Tabs value={sourceType} className={classes.menu}>
        {links.map(({ id, path, label }) => (
          <Tab
            key={id}
            label={t(label)} // i18next-extract-disable-line
            value={id}
            component={Link}
            to={`/map/${gridCode}/${path}`}
            state={{ modal }}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default withModalContext(GridPointTabs);
