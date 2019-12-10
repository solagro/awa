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
  },
  {
    path: 'climate-observations',
    id: 'climateObservations',
  },
  {
    path: 'climate-projections',
    id: 'climateProjections',
  },
];

const GridPointTabs = ({ sourceType, gridCode, modalProps: { modal } }) => {
  const { t } = useTranslation();

  return (
    <AppBar position="static">
      <Tabs value={sourceType}>
        {links.map(({ id, path }) => (
          <Tab
            key={id}
            label={t(id)} // i18next-extract-disable-line
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
