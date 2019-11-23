import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';
import SEO from './Seo';
import Layout from './Layout';

import doRedirect from '../hoc/doRedirect';

const ClimateObservation = ({
  pageContext: { gridCode },
  data: {
    allGridPointDataCell: {
      allKeys,
      allYears,
    },
  },
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <SEO title={t('Active site detailed information card')} lang={i18n.language} />

      <Typography variant="h1" gutterBottom>
        {t('Active site detailed information card')}
      </Typography>

      <Typography variant="h3" component="h2">
        {t('Question')}
      </Typography>

      <pre>
        {JSON.stringify({
          gridCode,
          allKeys: allKeys.map(({ fieldValue }) => fieldValue),
          allYears: allYears.map(({ nodes, ...rest }) => ({
            ...rest,
            nodes: nodes.map(({ value }) => value),
          })),
        }, null, 2)}
      </pre>
    </Layout>
  );
};

export const query = graphql`
  query ($gridCode: String, $sourceType: String) {
    allGridPointDataCell(filter: {gridCode: {eq: $gridCode}, sourceType: {eq: $sourceType}}) {
      allKeys: group(field: key) { fieldValue }
      allYears: group(field: year) {
        fieldValue
        nodes { value }
      }
    }
  }
`;

export default doRedirect(ClimateObservation);
