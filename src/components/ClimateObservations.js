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

import { CustomLineChart, ChartLegend, CustomStackedBarChart } from './Charts';

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

      <SecondaryAppBar position="static">
        <SecondaryTabs value={currentTab} onChange={handleTabChange}>
          {Object.values(groups).map((label, idx) => (
            <SecondaryTab label={label} key={label} id={`simple-tab-${idx}`} aria-controls={`simple-tabpanel-${idx}`} />
          ))}
        </SecondaryTabs>
      </SecondaryAppBar>

      <TabPanel value={currentTab} index={0}>
        <Typography variant="subtitle1">{t('averageTemperatureAnnual')}</Typography>
        <CustomLineChart {...dataCharts.averageTemperatureAnnual} />

        <Typography variant="subtitle1">{t('averageTemperatureSeasonal')}</Typography>
        <CustomLineChart {...dataCharts.averageTemperatureSeasonal} colors={seasonsColors} />
        {/* <ChartLegend meta={dataCharts.averageTemperatureSeasonal.meta} /> */}
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <Typography variant="subtitle1">{t('precipitationAnnual')}</Typography>
        <CustomLineChart {...dataCharts.precipitationAnnual} />

        <Typography variant="subtitle1">{t('precipitationSeasonal')}</Typography>
        <CustomStackedBarChart {...dataCharts.precipitationSeasonal} colors={seasonsColors} />
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <Typography variant="subtitle1">{t('hydricDeficitAnnual')}</Typography>
        <CustomLineChart {...dataCharts.hydricDeficitAnnual} />

        <Typography variant="subtitle1">{t('hydricDeficitSeasonal')}</Typography>
        <CustomStackedBarChart {...dataCharts.hydricDeficitSeasonal} colors={seasonsColors} />
      </TabPanel>

      <TabPanel value={currentTab} index={3}>
        <Typography variant="subtitle1">{t('frozenDays')}</Typography>
        <CustomLineChart {...dataCharts.frozenDays} />
      </TabPanel>

      <TabPanel value={currentTab} index={4}>
        <Typography variant="subtitle1">{t('estivalDays')}</Typography>
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
