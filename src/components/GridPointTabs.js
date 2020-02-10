import React from 'react';
import { useTranslation } from 'react-i18next';

import { CustomAppBar, CustomTabs, CustomTab } from './StyledTabs';
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
    <CustomAppBar position="static">
      <CustomTabs value={sourceType}>
        {links.map(({ id, path, label }) => (
          <CustomTab
            key={id}
            label={t(label)} // i18next-extract-disable-line
            value={id}
            component={Link}
            to={`/map/${gridCode}/${path}`}
            state={{ modal, closeTo }}
          />
        ))}
      </CustomTabs>
    </CustomAppBar>
  );
};

export default withModalContext(GridPointTabs);
