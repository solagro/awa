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

const filterBy = key => value => ({ [key]: property }) => (property === value);
const singleKey = key => ({ [key]: value }) => value;

const AdaptationMeasures = ({
  pageContext: {
    vulnerability: currentVulnerability,
    system: currentSystem,
  },
  data: {
    farmingSystemsContainer: { farmingSystems: rawFoundFarmingSystems },
    vulnerabilitiesContainer: { vulnerabilities: rawFoundVulnerabilities },
    regionsContainer: { regions: rawFoundRegions },
    adaptationMeasuresContainer: { adaptationMeasures },
    catalog,
  },
}) => {
  const { t, i18n } = useTranslation();

  /**
   * Simplify results from GraphQL group queries
   */
  const foundFarmingSystems = rawFoundFarmingSystems.map(singleKey('fieldValue'));
  const foundVulnerabilities = rawFoundVulnerabilities.map(singleKey('fieldValue'));
  const foundRegions = rawFoundRegions.map(singleKey('fieldValue'));

  /**
   * Array of farming systems for rendering system tabs
   */
  const systemLinks = catalog.farming_system.map(({ value: system }) => ({
    id: system,
    path: system,
    enabled: foundFarmingSystems.includes(system),
  }));

  const currentSystemId = catalog.farming_system.find(({ value }) => (value === currentSystem)).id;

  /**
   * Array of vulnerabilities for rendering Vulnerability tabs
   */
  const vulnerabilityLinks = catalog.farm_vulnerability_component
    // Keep only vulnerabilities from current system
    .filter(({ id }) => (id[0] === currentSystemId))
    .map(({ value: vulnerability }) => ({
      id: vulnerability,
      path: vulnerability,
      enabled: foundVulnerabilities.includes(vulnerability),
    }));

  /**
   * Array of regions for rendering <Select />
   */
  const regionItems = catalog.climate_risk_region.map(({ value: region }) => ({
    id: region,
    enabled: foundRegions.includes(region),
  }));

  /**
   * Array of adaptations measures for rendering it as a list
   */
  const allMeasureLinks = adaptationMeasures.map(({
    fields: { slug, measure: { name, climate_risk_region: region, implementation: term } },
  }) => ({ slug, name, region, term }));

  const stateFromRegion = newRegion => {
    const regionMeasures = allMeasureLinks.filter(filterBy('region')(newRegion));

    return {
      selectedRegion: newRegion,
      selectedImplementations: new Set(catalog.implementation.map(({ value }) => value)),
      availableImplementations: new Set(regionMeasures.map(({ term }) => term)),
      activeMeasures: regionMeasures,
    };
  };

  const measureReducer = (state, action) => {
    switch (action.type) {
      case 'SET_REGION': {
        const newRegion = action.value;

        return {
          ...state,
          ...stateFromRegion(newRegion),
        };
      }

      case 'SET_IMPLEMENTATION': {
        const newImplementation = action.value;
        const newSelection = new Set(state.selectedImplementations);

        if (newSelection.has(newImplementation)) {
          newSelection.delete(newImplementation);
        } else {
          newSelection.add(newImplementation);
        }
        return {
          ...state,
          selectedImplementations: newSelection,
          activeMeasures: allMeasureLinks
            .filter(filterBy('region')(state.selectedRegion))
            .filter(({ term }) => newSelection.has(term)),
        };
      }

      default:
        throw new Error('Unmanaged action');
    }
  };

  const initialAdaptationState = stateFromRegion(foundRegions[0]);
  const [adaptationState, dispatch] = React.useReducer(measureReducer, initialAdaptationState);

  const implementationItems = catalog.implementation.map(({ value }) => value);

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
              onChange={(event, target) => dispatch({ type: 'SET_REGION', value: target.key })}
              value={adaptationState.selectedRegion}
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
              {implementationItems.map(id => (
                <FormControlLabel
                  control={(
                    <Checkbox
                      value={id}
                      onChange={() => dispatch({ type: 'SET_IMPLEMENTATION', value: id })}
                      checked={adaptationState.selectedImplementations.has(id)}
                      disabled={!adaptationState.availableImplementations.has(id)}
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
        {adaptationState.activeMeasures
          .map(({ slug, name, region, term }) => (
            <li key={slug}>
              <Link
                to={`/adaptations/${currentSystem}/${currentVulnerability}/${region}/${slug}`}
                state={{ modal: true }}
              >
                {name}
                ({region})
                ({term})
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
      climate_risk_region { id value }
      implementation { id value }
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

    # Get all regions for current system/vulnerability pair
    regionsContainer: allAdaptationMeasures(
      filter: {
        fields: {
          measure: {
            farming_system: { eq: $system }
            farm_vulnerability_component: { eq: $vulnerability }
          }
        }
      }
    ) {
      regions: group(field: fields___measure___climate_risk_region) {
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
