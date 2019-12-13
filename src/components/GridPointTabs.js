import React from 'react';
import { useTranslation } from 'react-i18next';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Link from './Link';
import withModalContext from '../hoc/withModalRoutingContext';

const links = [
  {
    path: 'yield-compilation',
    id: 'yieldCompilation',
    label: 'Yield Compilation',
  },
  {
    path: 'climate-observations',
    id: 'climateObservations',
    label: 'Climate Observations',
  },
  {
    path: 'climate-projections',
    id: 'climateProjections',
    label: 'Climate Projections',
  },
];

const GridPointTabs = ({ sourceType, gridCode, modalProps: { modal, closeTo } }) => {
  const { t } = useTranslation();

  return (
    <AppBar position="static">
      <Tabs value={sourceType}>
        {links.map(({ id, path, label }) => (
          <Tab
            key={id}
            label={t(label)} // i18next-extract-disable-line
            value={id}
            component={Link}
            to={`/map/${gridCode}/${path}`}
            state={{ modal, closeTo }}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default withModalContext(GridPointTabs);
