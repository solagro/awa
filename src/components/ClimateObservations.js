import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import GridPointTabs from './GridPointTabs';
import Layout from './Layout';
import SEO from './Seo';
import TabPanel from './TabPanel';
import TabsFooter from './TabsFooter';

import { Chart1 } from './Charts';

import doRedirect from '../hoc/doRedirect';
import { parseData } from '../lib/dataTable';

const ClimateObservations = ({
  pageContext: { sourceType, gridCode },
  data: { allGridPointData: { nodes } },
}) => {
  const { t, i18n } = useTranslation();

  const [currentTab, setCurrentTab] = React.useState(0);
  const handleTabChange = (event, newValue) => setCurrentTab(newValue);

  const dataCharts = nodes.reduce((acc, { dataType, json }) => ({
    ...acc,
    [dataType]: parseData(json),
  }), {});

  const groups = {
    'average-temperature': t('average-temperature'),
    'precipitation': t('precipitation'), // eslint-disable-line quote-props
    'hydric-deficit': t('hydric-deficit'),
    'frozen-days': t('frozen-days'),
    'estival-days': t('estival-days'),
  };

  const seasonsColors = ['#749eb6', '#88b42d', '#db5630', '#79454a'];

  return (
    <Layout>
      <SEO title={t('Active site detailed information card')} lang={i18n.language} />
      <Typography variant="h1" gutterBottom align="center">{t('Active site detailed information card')}</Typography>
      <GridPointTabs sourceType={sourceType} gridCode={gridCode} />

      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleTabChange}>
          {Object.values(groups).map((label, idx) => (
            <Tab label={label} key={label} id={`simple-tab-${idx}`} aria-controls={`simple-tabpanel-${idx}`} />
          ))}
        </Tabs>
      </AppBar>

      <TabPanel value={currentTab} index={0}>
        <Chart1 {...dataCharts.averageTemperatureAnnual} type="step" />
        <Chart1 {...dataCharts.averageTemperatureSeasonal} type="step" colors={seasonsColors} />
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <Chart1 {...dataCharts.precipitationAnnual} type="step" />
        <Chart1 {...dataCharts.precipitationSeasonal} colors={seasonsColors} />
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <Chart1 {...dataCharts.hydricDeficitAnnual} type="step" />
        <Chart1 {...dataCharts.hydricDeficitSeasonal} colors={seasonsColors} />
      </TabPanel>

      <TabPanel value={currentTab} index={3}>
        <Chart1 {...dataCharts.frozenDays} type="step" />
      </TabPanel>

      <TabPanel value={currentTab} index={4}>
        <Chart1 {...dataCharts.estivalDays} type="step" />
      </TabPanel>

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
