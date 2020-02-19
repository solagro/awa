import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import CustomIcon from './CustomIcon';

const RiskRegion = ({
  region,
  label,
  showName = false,
  className,
  ...props
}) => {
  const { catalog } = useStaticQuery(graphql`
    {
      catalog: adaptationsJson {
        climate_risk_region {
          value
          id
        }
      }
    }
  `);

  const getRegionId = r => {
    const foundRegion = catalog.climate_risk_region.find(({ value }) => (value === r));
    return foundRegion ? foundRegion.id : 0;
  };

  return (
    <CustomIcon
      src={`/images/regions/ZONE_${getRegionId(region)}.png`}
      label={label}
      showLabel={showName}
      {...props}
    />
  );
};

export default RiskRegion;
