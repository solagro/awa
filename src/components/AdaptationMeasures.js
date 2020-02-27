import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Layout from './Layout';
import Link from './Link';
import SEO from './Seo';

import AdaptationMeasureList from './AdaptationMeasureList';
import FarmingSystemTabs from './FarmingSystemTabs';
import VulnerabilityComponentTabs from './VulnerabilityComponentTabs';

import { singleKey, filterBy } from '../lib/adaptationsHelpers';
import doRedirect from '../hoc/doRedirect';
import RiskRegion from './RiskRegion';
import MarkdownText from './MarkdownText';
import RegionSelector from './RegionSelector';
import ImplementationSelector from './ImplementationSelector';

const isLive = typeof window !== 'undefined';

const useStyles = makeStyles(theme => ({
  region: {
    display: 'flex',
    alignItems: 'center',
  },
  regionIcon: {
    marginRight: theme.spacing(1),
  },
  regionSelect: {
    padding: theme.spacing(1),
    minWidth: 120,
  },
  regionSelectKnob: {
    top: '50%',
    transform: 'translateY(-50%)',
    width: '1em',
    height: '1em',
  },
  implementation: {
    marginTop: theme.spacing(4),
    '& legend': {
      fontWeight: 500,
      fontsize: theme.typography.subtitle1,
    },
  },
}));

const AdaptationMeasures = ({
  pageContext: {
    vulnerability: currentVulnerability,
    system: currentSystem,
  },
  data: {
    regionsContainer: { regions: rawFoundRegions },
    adaptationMeasuresContainer: { adaptationMeasures },
    vulnerabilityTextsContainer: { vulnerabilityTexts = [] },
    catalog,
  },
}) => {
  const { t, i18n } = useTranslation();

  const classes = useStyles();

  /**
   * Simplify results from GraphQL group queries
   */
  const foundRegions = rawFoundRegions.map(singleKey('fieldValue'));

  /**
   * Array of regions for rendering <Select />
   */
  const regionItems = catalog.climate_risk_region
    .filter(({ value }) => foundRegions.includes(value))
    .map(({ value, ...rest }) => ({
      ...rest,
      value,
      enabled: foundRegions.includes(value),
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

      {Boolean(vulnerabilityTexts.length) && (
        <Box>
          {vulnerabilityTexts.map(({ id, content: { htmlAst } }) => (
            <MarkdownText key={id} hast={htmlAst} />
          ))}

          <Divider variant="middle" style={{ margin: '1em' }} />
        </Box>
      )}

      {Boolean(allMeasureLinks.length) && (
        <Grid container justify="center" alignItems="flex-start">
          {isLive && (
            <Grid item xs={12} sm={5}>

              <Box className={classes.region}>
                <RiskRegion
                  region={adaptationState.selectedRegion}
                  className={classes.regionIcon}
                />

                <RegionSelector
                  regions={regionItems}
                  onChange={(event, target) => dispatch({ type: 'SET_REGION', value: target.key })}
                  value={adaptationState.selectedRegion}
                  classes={{
                    root: classes.regionSelect,
                    icon: classes.regionSelectKnob,
                  }}
                />
              </Box>

              <FormControl component="fieldset" className={classes.implementation}>
                <FormLabel component="legend">{t('Filter actions by timing')}</FormLabel>

                <ImplementationSelector
                  implementations={implementationItems}
                  availableImplementations={adaptationState.availableImplementations}
                  selectedImplementations={adaptationState.selectedImplementations}
                  onChange={id => dispatch({ type: 'SET_IMPLEMENTATION', value: id })}
                />
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} sm={5}>
            <Typography variant="h3">
              {t('Click on an action to see the detail')}
            </Typography>
            <AdaptationMeasureList
              measures={adaptationState.activeMeasures}
              linkPrefix={`/adaptations/${currentSystem}/${currentVulnerability}`}
            />
          </Grid>
        </Grid>
      )}

      <div style={{ textAlign: 'center', marginTop: '5em' }}>
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
  query ($system: String!, $vulnerability: String!, $language: String!) {

    # Get all farming systems & vulnerability components from catalog
    catalog: adaptationsJson {
      farming_system { id value }
      farm_vulnerability_component { id value }
      climate_risk_region { id value }
      implementation { id value }
    }

    # Get all regions for current system/vulnerability pair
    regionsContainer: allAdaptationMeasures(
      sort: { fields: fields___slug }
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
      sort: { fields: fields___slug }
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

    vulnerabilityTextsContainer: allFile(
      sort: { fields: relativePath }
      filter: {
        sourceInstanceName: { eq: "adaptations" },
        extension: { eq: "md" },
        childMarkdownRemark: {
          frontmatter: {
            locale: { eq: $language }
            system: { eq: $system }
            vulnerability: { eq: $vulnerability }
          }
        }
      }
    ) {
      vulnerabilityTexts: nodes {
        id
        content: childMarkdownRemark { htmlAst }
      }
    }

  }
`;

export default doRedirect(AdaptationMeasures);
