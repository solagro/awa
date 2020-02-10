import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

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

const AdaptationMeasures = ({
  pageContext: {
    vulnerability: currentVulnerability,
    system: currentSystem,
  },
  data: {
    farmingSystemsContainer: { farmingSystems },
    vulnerabilitiesContainer: { vulnerabilities },
    adaptationMeasuresContainer: { adaptationMeasures },
  },
}) => {
  const { t, i18n } = useTranslation();

  const systemLinks = farmingSystems.map(({ fieldValue }) => ({
    id: fieldValue,
    path: fieldValue,
    label: t(fieldValue), // i18next-extract-disable-line
  }));

  const vulnerabilityLinks = vulnerabilities.map(({ fieldValue }) => (fieldValue));

  const measureLinks = adaptationMeasures.map(({
    fields: { slug, measure: { name, climate_risk_region: region } },
  }) => ({ slug, name, region }));

  return (
    <Layout>
      <SEO title={t('Sustainable adaptation measures')} lang={i18n.language} />
      <Typography variant="h1" gutterBottom align="center">{t('Sustainable adaptation measures')}</Typography>

      <CustomAppBar position="static">
        <CustomTabs value={currentSystem}>
          {systemLinks.map(({ id, path, label }) => (
            <CustomTab
              key={id}
              label={t(label)} // i18next-extract-disable-line
              value={id}
              component={Link}
              to={`/adaptations/${path}`}
            />
          ))}
        </CustomTabs>
      </CustomAppBar>

      <SecondaryAppBar position="static">
        <SecondaryTabs value={currentVulnerability}>
          {vulnerabilityLinks.map(vulnerability => (
            <SecondaryTab
              key={vulnerability}
              label={t(vulnerability)} // i18next-extract-disable-line
              value={vulnerability}
              component={Link}
              to={`/adaptations/${currentSystem}/${vulnerability}`}
            />
          ))}
        </SecondaryTabs>
      </SecondaryAppBar>

      <ul>
        {measureLinks.map(({ slug, name, region }) => (
          <li>
            <Link to={`/adaptations/${currentSystem}/${currentVulnerability}/${region}/${slug}`}>
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

    # Get all farming systems
    farmingSystemsContainer: allAdaptationMeasures {
      farmingSystems: group(field: fields___measure___farming_system) {
        fieldValue
      }
    }

    # Get vulnerabilities for current system
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
