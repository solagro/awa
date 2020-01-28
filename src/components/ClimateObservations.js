import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';

import ChartsTabs from './ChartsTabs';
import GridPointTabs from './GridPointTabs';
import Layout from './Layout';
import SEO from './Seo';
import TabsFooter from './TabsFooter';

import doRedirect from '../hoc/doRedirect';
import { parseData } from '../lib/dataTable';

const ClimateObservations = ({
  pageContext: { sourceType, gridCode },
  data: { allGridPointData: { nodes } },
}) => {
  const { t, i18n } = useTranslation();

  const dataCharts = nodes.map(({ dataType, json }) => ({
    dataType,
    ...parseData(json),
  }));

  const groupTabs = [
    {
      label: t('average-temperature'),
      charts: ['averageTemperatureAnnual', 'averageTemperatureSeasonal'],
    },
    {
      label: t('precipitation'),
      charts: ['precipitationAnnual', 'precipitationSeasonal'],
    },
    {
      label: t('hydric-deficit'),
      charts: ['hydricDeficitAnnual', 'hydricDeficitSeasonal'],
    },
    {
      label: t('frozen-days'),
      charts: ['frozenDays'],
    },
    {
      label: t('estival-days'),
      charts: ['estivalDays'],
    },
  ];

  return (
    <Layout>
      <SEO title={t('Active site detailed information card')} lang={i18n.language} />
      <Typography variant="h1" gutterBottom align="center">{t('Active site detailed information card')}</Typography>
      <GridPointTabs sourceType={sourceType} gridCode={gridCode} />

      <ChartsTabs groupTabs={groupTabs} dataCharts={dataCharts} />

      <TabsFooter />
    </Layout>
  );
};

export const query = graphql`
  query ($gridCode: String, $sourceType: String) {
    allGridPointData(filter: {gridCode: {eq: $gridCode}, sourceType: {eq: $sourceType}}) {
      nodes {
        dataType
        json
      }
    }
    allDataTypes: allGridPointData(filter: {sourceType: {eq: $sourceType}}) {
      group(field: dataType) {
        dataType: fieldValue
      }
    }
  }
`;

export default doRedirect(ClimateObservations);
