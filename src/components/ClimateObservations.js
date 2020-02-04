import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import GridPointTabs from './GridPointTabs';
import Layout from './Layout';
import SEO from './Seo';
import TabPanel from './TabPanel';
import TabsFooter from './TabsFooter';

import {
  CustomLineChart,
  CustomStackedBarChart,
  CustomAreaChart,
  ChartTitle,
} from './Charts';

import doRedirect from '../hoc/doRedirect';
import { parseData } from '../lib/dataTable';

const SecondaryAppBar = withStyles(theme => ({
  colorPrimary: {
    backgroundColor: 'transparent',
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(3),
    boxShadow: 'none',
    color: theme.palette.text.primary,
  },
}))(props => <AppBar {...props} />);

const SecondaryTabs = withStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  flexContainer: {
    marginBottom: theme.spacing(0),
  },
  indicator: {
    height: 3,
  },
}))(props => <Tabs {...props} centered />);

const SecondaryTab = withStyles(theme => ({
  root: {
    fontSize: '.8rem',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '&:hover': {
      fontWeight: 700,
      opacity: 1,
    },
    '&$selected': {
      color: '#000',
      opacity: 1,
    },
    '&:focus': {
      color: '#000',
      opacity: 1,
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const ClimateObservations = ({
  pageContext: { sourceType, gridCode },
  data: { allGridPointData: { nodes } },
}) => {
  const { t, i18n } = useTranslation();

  const [currentTab, setCurrentTab] = React.useState('average-temperature');
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

      <SecondaryAppBar position="static">
        <SecondaryTabs value={currentTab} onChange={handleTabChange}>
          {Object.entries(groups).map(([key, label]) => (
            <SecondaryTab
              label={label}
              key={key}
              value={key}
              id={`simple-tab-${key}`}
              aria-controls={`simple-tabpanel-${key}`}
            />
          ))}
        </SecondaryTabs>
      </SecondaryAppBar>

      <TabPanel value={currentTab} index="average-temperature">
        {/* i18next-extract-disable-next-line */}
        <ChartTitle main={t('averageTemperatureAnnual')} />
        <CustomLineChart {...dataCharts.averageTemperatureAnnual} />

        {/* i18next-extract-disable-next-line */}
        <ChartTitle main={t('averageTemperatureSeasonal')} />
        <CustomLineChart {...dataCharts.averageTemperatureSeasonal} colors={seasonsColors} />
      </TabPanel>

      <TabPanel value={currentTab} index="precipitation">
        {/* i18next-extract-disable-next-line */}
        <ChartTitle main={t('precipitationAnnual')} />
        <CustomLineChart {...dataCharts.precipitationAnnual} />

        {/* i18next-extract-disable-next-line */}
        <ChartTitle main={t('precipitationSeasonal')} />
        <CustomStackedBarChart {...dataCharts.precipitationSeasonal} colors={seasonsColors} />
      </TabPanel>

      <TabPanel value={currentTab} index="hydric-deficit">
        {/* i18next-extract-disable-next-line */}
        <ChartTitle main={t('hydricDeficitAnnual')} />
        <CustomAreaChart {...dataCharts.hydricDeficitAnnual} />

        {/* i18next-extract-disable-next-line */}
        <ChartTitle main={t('hydricDeficitSeasonal')} />
        {dataCharts.hydricDeficitSeasonal.headers.map((header, idx) => (
          <div key={header} style={{ marginTop: '2em' }}>
            {/* i18next-extract-disable-next-line */}
            <ChartTitle main={`IAC - ${t(header)} - ${t(dataCharts.hydricDeficitSeasonal.meta[header])}`} />
            <CustomAreaChart
              {...dataCharts.hydricDeficitSeasonal}
              key={header}
              dataKeys={[header]}
              color={seasonsColors[idx]}
            />
          </div>
        ))}

      </TabPanel>

      <TabPanel value={currentTab} index="frozen-days">
        {/* i18next-extract-disable-next-line */}
        <ChartTitle main={t('frozenDays')} />
        <CustomLineChart {...dataCharts.frozenDays} />
      </TabPanel>

      <TabPanel value={currentTab} index="estival-days">
        {/* i18next-extract-disable-next-line */}
        <ChartTitle main={t('estivalDays')} />
        <CustomLineChart {...dataCharts.estivalDays} />
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
