import React from 'react';
import { useTranslation } from 'react-i18next';

import { CustomAppBar, CustomTabs, CustomTab } from './StyledTabs';
import Link from './Link';

import withModalContext from '../hoc/withModalRoutingContext';

const links = [
  {
    path: 'yield-compilation',
    sourceType: 'yieldCompilation',
  },
  {
    path: 'climate-observations',
    sourceType: 'climateObservations',
  },
  {
    path: 'climate-projections',
    sourceType: 'climateProjections',
  },
];

const GridPointTabs = ({
  sourceType: currentSourceType,
  gridCode,
  modalProps: { modal, closeTo },
}) => {
  const { t } = useTranslation();

  return (
    <CustomAppBar position="static">
      <CustomTabs value={currentSourceType}>
        {links.map(({ path, sourceType }) => (
          <CustomTab
            key={path}
            label={t(path)} // i18next-extract-disable-line
            value={sourceType}
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
