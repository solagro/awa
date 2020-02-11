import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql, useStaticQuery } from 'gatsby';

import Link from './Link';
import {
  CustomTabs,
  CustomAppBar,
  CustomTab,
} from './StyledTabs';

// const filterBy = key => value => ({ [key]: property }) => (property === value);
const singleKey = key => ({ [key]: value }) => value;

const FarmingSystemTabs = ({ current: currentSystem }) => {
  const { t } = useTranslation();

  const {
    farmingSystemsContainer: { farmingSystems: rawFoundFarmingSystems },
    catalog,
  } = useStaticQuery(graphql`
    query {
      # Get all farming systems & vulnerability components from catalog
      catalog: adaptationsJson {
        farming_system { id value }
      }

      # Get all farming systems having at least one measure
      farmingSystemsContainer: allAdaptationMeasures {
        farmingSystems: group(field: fields___measure___farming_system) {
          fieldValue
        }
      }
    }
  `);

  /**
   * Simplify results from GraphQL group queries
   */
  const foundFarmingSystems = rawFoundFarmingSystems.map(singleKey('fieldValue'));

  /**
   * Array of farming systems for rendering system tabs
   */
  const systemLinks = catalog.farming_system.map(({ value: system }) => ({
    id: system,
    path: system,
    enabled: foundFarmingSystems.includes(system),
  }));

  return (
    <CustomAppBar position="static">
      <CustomTabs value={currentSystem}>
        {systemLinks.map(({ id, path, enabled }) => (
          <CustomTab
            disabled={!enabled}
            key={id}
            label={t(id)} // i18next-extract-disable-line
            value={id}
            component={Link}
            to={`/adaptations/${path}`}
          />
        ))}
      </CustomTabs>
    </CustomAppBar>
  );
};

export default FarmingSystemTabs;
