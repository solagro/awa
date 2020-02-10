import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import Layout from './Layout';
import Link from './Link';
import SEO from './Seo';
import {
  CustomTabs,
  CustomAppBar,
  CustomTab,
  SecondaryAppBar,
  SecondaryTabs,
  SecondaryTab,
} from './StyledTabs';

import doRedirect from '../hoc/doRedirect';

const isLive = typeof window !== 'undefined';

const AdaptationMeasures = ({
  pageContext: {
    vulnerability: currentVulnerability,
    system: currentSystem,
  },
  data: {
    farmingSystemsContainer: { farmingSystems: foundFarmingSystems },
    vulnerabilitiesContainer: { vulnerabilities: foundVulnerabilities },
    adaptationMeasuresContainer: { adaptationMeasures },
    catalog,
  },
}) => {
  const { t, i18n } = useTranslation();

  /**
   * Farming systems
   */
  const systemLinks = catalog.farming_system.map(({ value: system }) => ({
    id: system,
    path: system,
    enabled: foundFarmingSystems.some(({ fieldValue }) => (fieldValue === system)),
  }));

  const currentSystemId = catalog.farming_system.find(({ value }) => (value === currentSystem)).id;

  /**
   * Vulnerability components
   */
  const vulnerabilityLinks = catalog.farm_vulnerability_component
    // Keep only vulnerabilities from current system
    .filter(({ id }) => (id[0] === currentSystemId))
    .map(({ value: vulnerability }) => ({
      id: vulnerability,
      path: vulnerability,
      enabled: foundVulnerabilities.some(({ fieldValue }) => (fieldValue === vulnerability)),
    }));

  /**
   * Adaptations measures
   */
  const measureLinks = adaptationMeasures.map(({
    fields: { slug, measure: { name, climate_risk_region: region, implementation: term } },
  }) => ({ slug, name, region, term }));

  /**
   * Regions & Implementations
   */
  const {
    regions: foundRegions,
    implementations: foundImplementations,
  } = adaptationMeasures
    .reduce(({ regions, implementations }, {
      fields: { measure: { climate_risk_region: region, implementation } },
    }) => ({
      regions: Array.from(new Set([...regions, region])),
      implementations: Array.from(new Set([...implementations, implementation])),
    }), { regions: [], implementations: [] });

  /**
   * Regions state
   */
  const regionItems = catalog.climate_risk_region.map(({ value: region }) => ({
    id: region,
    enabled: foundRegions.includes(region),
  }));

  const [selectedRegion, setSelectedRegion] = React.useState(foundRegions[0]);

  const handleRegionChange = (event, target) => {
    setSelectedRegion(target.key);
  };

  /**
   * Implementations state
   */
  const implementationItems = catalog.implementation.map(({ value: implementation }) => ({
    id: implementation,
    enabled: foundImplementations.includes(implementation),
  }));

  const [enabledImp, setEnabledImp] = React.useState(new Set(foundImplementations));

  const toggleImplementation = implementation => () => {
    const newSet = new Set(enabledImp);

    if (enabledImp.has(implementation)) {
      newSet.delete(implementation);
    } else {
      newSet.add(implementation);
    }

    setEnabledImp(newSet);
  };

  /**
   * Measure list filter
   */
  const measureFilter = ({ region, term }) => {
    if (!isLive) {
      return true;
    }

    if (!enabledImp.has(term)) {
      return false;
    }

    if (selectedRegion !== region) {
      return false;
    }

    return true;
  };

  return (
    <Layout>
      <SEO title={t('Sustainable adaptation measures')} lang={i18n.language} />
      <Typography variant="h1" gutterBottom align="center">{t('Sustainable adaptation measures')}</Typography>

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

      <SecondaryAppBar position="static">
        <SecondaryTabs value={currentVulnerability}>
          {vulnerabilityLinks.map(({ id, path, enabled }) => (
            <SecondaryTab
              disabled={!enabled}
              key={id}
              label={t(id)} // i18next-extract-disable-line
              value={id}
              component={Link}
              to={`/adaptations/${currentSystem}/${path}`}
            />
          ))}
        </SecondaryTabs>
      </SecondaryAppBar>

      {isLive && (
        <>
          <FormControl>
            <InputLabel id="regionSelect">{t('Region')}</InputLabel>
            <Select
              labelId="regionSelect"
              onChange={handleRegionChange}
              value={selectedRegion}
            >
              {regionItems.map(({ id, enabled }) => (
                <MenuItem key={id} value={id} disabled={!enabled}>
                  {t(id)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider variant="middle" style={{ margin: '1em' }} />

          <FormControl component="fieldset">
            <FormLabel component="legend">{t('Implementation')}</FormLabel>
            <FormGroup>
              {implementationItems.map(({ id, enabled }) => (
                <FormControlLabel
                  control={(
                    <Checkbox
                      value={id}
                      onChange={toggleImplementation(id)}
                      checked={enabledImp.has(id)}
                      disabled={!enabled}
                    />
                  )}
                  label={t(id)}
                  key={id}
                />
              ))}
            </FormGroup>
          </FormControl>

          <Divider variant="middle" style={{ margin: '1em' }} />
        </>
      )}

      <Typography variant="h3">
        {t('Click on an action to see the detail')}
      </Typography>
      <ul>
        {measureLinks
          .filter(measureFilter)
          .map(({ slug, name, region }) => (
            <li key={slug}>
              <Link
                to={`/adaptations/${currentSystem}/${currentVulnerability}/${region}/${slug}`}
                state={{ modal: true }}
              >
                {name}
              </Link>
            </li>
          ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query ($system: String!, $vulnerability: String!) {

    # Get all farming systems & vulnerability components from catalog
    catalog: adaptationsJson {
      farming_system { id value }
      farm_vulnerability_component { id value }
      implementation { id value }
      climate_risk_region { id value }
    }

    # Get all farming systems having at least one measure
    farmingSystemsContainer: allAdaptationMeasures {
      farmingSystems: group(field: fields___measure___farming_system) {
        fieldValue
      }
    }

    # Get all vulnerabilities for current system having at least one measure
    vulnerabilitiesContainer: allAdaptationMeasures(
      filter: {
        fields: {
          measure: {
            farming_system: { eq: $system }
          }
        }
      }
    ) {
      vulnerabilities: group(field: fields___measure___farm_vulnerability_component) {
        fieldValue
      }
    }

    # Get all measures for current system/vulnerability
    adaptationMeasuresContainer: allAdaptationMeasures(
      filter: {
        fields: {
          measure: {
            farming_system: { eq: $system },
            farm_vulnerability_component: { eq: $vulnerability }
          }
        }
      }
    ) {
      adaptationMeasures: nodes {
        fields {
          slug
          measure {
            alt_language
            name
            alt_name
            implementation
            climate_risk_region
          }
        }
      }
    }
  }
`;

export default doRedirect(AdaptationMeasures);
