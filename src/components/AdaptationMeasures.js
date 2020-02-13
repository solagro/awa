import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Button from '@material-ui/core/Button';
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

import { useTheme } from '@material-ui/core/styles';

import Layout from './Layout';
import Link from './Link';
import SEO from './Seo';

import AdaptationMeasureList from './AdaptationMeasureList';
import FarmingSystemTabs from './FarmingSystemTabs';
import VulnerabilityComponentTabs from './VulnerabilityComponentTabs';

import { singleKey, filterBy, getImplementationColorProps } from '../lib/adaptationsHelpers';
import doRedirect from '../hoc/doRedirect';

const isLive = typeof window !== 'undefined';

const AdaptationMeasures = ({
  pageContext: {
    vulnerability: currentVulnerability,
    system: currentSystem,
  },
  data: {
    regionsContainer: { regions: rawFoundRegions },
    adaptationMeasuresContainer: { adaptationMeasures },
    catalog,
  },
}) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  /**
   * Simplify results from GraphQL group queries
   */
  const foundRegions = rawFoundRegions.map(singleKey('fieldValue'));

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
      selectedImplementations: new Set(catalog.implementation.map(singleKey('value'))),
      availableImplementations: new Set(regionMeasures.map(singleKey('term'))),
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

  const implementationItems = catalog.implementation.map(singleKey('value'));

  return (
    <Layout>
      <SEO title={t('Sustainable adaptation measures')} lang={i18n.language} />
      <Typography variant="h1" gutterBottom align="center">{t('Sustainable adaptation measures')}</Typography>

      <FarmingSystemTabs
        current={currentSystem}
      />

      <VulnerabilityComponentTabs
        currentSystem={currentSystem}
        current={currentVulnerability}
      />

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
              {implementationItems.map(id => {
                const enabled = adaptationState.availableImplementations.has(id);
                const checked = enabled && adaptationState.selectedImplementations.has(id);

                return (
                  <FormControlLabel
                    control={(
                      <Checkbox
                        value={id}
                        onChange={() => dispatch({ type: 'SET_IMPLEMENTATION', value: id })}
                        checked={checked}
                        disabled={!enabled}
                        {...getImplementationColorProps(theme)(id)}
                      />
                    )}
                    label={t(id)}
                    key={id}
                  />
                );
              })}
            </FormGroup>
          </FormControl>

          <Divider variant="middle" style={{ margin: '1em' }} />
        </>
      )}

      <Typography variant="h3">
        {t('Click on an action to see the detail')}
      </Typography>

      <AdaptationMeasureList
        measures={adaptationState.activeMeasures}
        linkPrefix={`/adaptations/${currentSystem}/${currentVulnerability}`}
      />

      <div style={{ textAlign: 'center' }}>
        <Button
          variant="outlined"
          component={Link}
          to="/quiz"
        >
          {t('Start a quiz')}
        </Button>
        {' '}
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/map"
          lang={i18n.language}
        >
          {t('Go to the map')}
        </Button>
      </div>
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
