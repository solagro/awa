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

const ClimateProjections = ({
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
    crops: t('crops'),
    fodder: t('fodder'),
    generalities: t('generalities'),
    vineyardFruit: t('vineyardFruit'),
    animal: t('animal'),
  };

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

      {Object.keys(groups).map((group, index) => (
        <TabPanel value={currentTab} index={index} key={group}>
          {dataCharts[group].headers.map(header => (
            <div key={header}>
              {/* i18next-extract-disable-line */}
              <Typography variant="h3">{t(header)}</Typography>
              <Chart1 {...dataCharts[group]} key={header} dataKeys={[header]} type="step" />
            </div>
          ))}
        </TabPanel>
      ))}

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

export default doRedirect(ClimateProjections);
