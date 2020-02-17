import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const RiskRegion = ({ region, label }) => {
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
    const foundRegion = catalog.climate_risk_region.find(({ value }) => (value === r))
    return foundRegion ? foundRegion.id : 0;
  };

  return (
    <img
      src={`/images/regions/ZONE_${getRegionId(region)}.png`}
      style={{ width: '4em' }}
      alt={label}
    />
  );
};

export default RiskRegion;
