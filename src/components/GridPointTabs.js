import React from 'react';
import { useTranslation } from 'react-i18next';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Link from './Link';

const links = [
  {
    path: 'yield-compilation',
    id: 'yieldCompilation',
  },
  {
    path: 'climate-observation',
    id: 'climateObservation',
  },
  {
    path: 'climate-projections',
    id: 'climateProjections',
  },
];

const GridPointTabs = ({ sourceType, gridCode }) => {
  const { t } = useTranslation();

  return (
    <AppBar position="static">
      <Tabs value={sourceType}>
        {links.map(({ id, path }) => (
          <Tab
            key={id}
            label={t(id)}
            value={id}
            component={Link}
            to={`/map/${gridCode}/${path}`}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default GridPointTabs;
