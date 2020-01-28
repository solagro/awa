import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import GridPointTabs from './GridPointTabs';
import Layout from './Layout';
import SEO from './Seo';
import TabsFooter from './TabsFooter';

import doRedirect from '../hoc/doRedirect';
import { parseData } from '../lib/dataTable';

const TabPanel = ({ children, value, index, ...props }) => (
  <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...props}
  >
    {value === index && <Box p={3}>{children}</Box>}
  </Typography>
);

const ClimateObservations = ({
  pageContext: { sourceType, gridCode },
  data: { allGridPointData: { nodes } },
}) => {
  const { t, i18n } = useTranslation();
  const [currentTab, setCurrentTab] = React.useState(0);
  const handleTabChange = (event, newValue) => setCurrentTab(newValue);

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

      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleTabChange}>
          {groupTabs.map(({ charts, ...tabProps }, index) => (
            <Tab
              key={tabProps.label}
              id={`simple-tab-${index}`}
              aria-controls={`simple-tabpanel-${index}`}
              {...tabProps}
            />
          ))}
        </Tabs>
      </AppBar>
      {groupTabs.map(({ label, charts }, index) => (
        <TabPanel value={currentTab} index={index} key={label}>
          {charts.map(currentDataType => {
            const { dataType, data, headers } = dataCharts
              .find(({ dataType: dt }) => dt === currentDataType);

            return (
              <div key={dataType}>
                <h3>{dataType}</h3>
                <LineChart
                  width={764}
                  height={364}
                  data={data}
                  margin={{
                    top: 16, right: 32, left: 32, bottom: 32,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  {/* i18next-extract-disable-next-line */}
                  <Tooltip formatter={(value, name) => ([value, t(name)])} />
                  {headers.map(key => (
                    <Line type="monotone" key={key} dataKey={key} stroke="#8a2542" />
                  ))}
                </LineChart>
              </div>
            );
          })}
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

export default doRedirect(ClimateObservations);
