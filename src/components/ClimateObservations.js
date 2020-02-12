import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';

import GridPointTabs from './GridPointTabs';
import Layout from './Layout';
import SEO from './Seo';
import { SecondaryAppBar, SecondaryTabs, SecondaryTab } from './StyledTabs';
import TabPanel from './TabPanel';
import TabsFooter from './TabsFooter';

import {
  CustomLineChart,
  CustomStackedBarChart,
  CustomAreaChart,
  ChartTitle,
  ChartText,
} from './Charts';

import doRedirect from '../hoc/doRedirect';
import { parseData } from '../lib/dataTable';

const ClimateObservations = ({
  pageContext: { sourceType, gridCode },
  data: {
    allGridPointData: { nodes: chartNodes },
    allTexts: { nodes: textNodes },
  },
}) => {
  const { t, i18n } = useTranslation();

  const [currentTab, setCurrentTab] = React.useState('average-temperature');
  const handleTabChange = (event, newValue) => setCurrentTab(newValue);

  const dataCharts = chartNodes.reduce((acc, { dataType, json }) => ({
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

  const seasonsColors = ['#749eb6', '#88b42d', '#ffce1a', '#fd8d3c'];


  const textNodesByGroup = textNodes.reduce((acc, { html, frontmatter: { dataType } }) => {
    const prevTexts = acc[dataType] || [];

    return {
      ...acc,
      [dataType]: [...prevTexts, html],
    };
  }, {});

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
        <ChartText contents={textNodesByGroup['average-temperature']} />

        <ChartTitle
          main={t('annual-average-temperature') /* i18next-extract-disable-line */}
          sub={dataCharts.averageTempAnnual.meta}
        />
        <CustomLineChart {...dataCharts.averageTempAnnual} />

        <ChartTitle
          main={t('seasonal-average-temperature') /* i18next-extract-disable-line */}
          sub={dataCharts.averageTempSeasonal.meta}
        />
        <CustomLineChart {...dataCharts.averageTempSeasonal} colors={seasonsColors} />
      </TabPanel>

      <TabPanel value={currentTab} index="precipitation">
        <ChartText contents={textNodesByGroup['precipitation']} /> {/* eslint-disable-line dot-notation */}

        <ChartTitle
          main={t('precipitationAnnual') /* i18next-extract-disable-line */}
          sub={dataCharts.precipitationAnnual.meta}
        />
        <CustomLineChart {...dataCharts.precipitationAnnual} color="#08519c" />

        <ChartTitle
          main={t('precipitationSeasonal')} /* i18next-extract-disable-line */
          sub={dataCharts.precipitationSeasonal.meta}
        />
        <CustomStackedBarChart {...dataCharts.precipitationSeasonal} colors={seasonsColors} />
      </TabPanel>

      <TabPanel value={currentTab} index="hydric-deficit">
        <ChartText contents={textNodesByGroup['hydric-deficit']} />

        <ChartTitle
          main={t('hydricDeficitAnnual') /* i18next-extract-disable-line */}
          sub={dataCharts.hydricDeficitAnnual.meta}
        />
        <CustomAreaChart {...dataCharts.hydricDeficitAnnual} color="#08519c" />

        {dataCharts.hydricDeficitSeasonal.headers.map((header, idx) => (
          <div key={header} style={{ marginTop: '2em' }}>
            <ChartTitle
              main={t(header) /* i18next-extract-disable-line */}
              sub={dataCharts.hydricDeficitSeasonal.meta[header]}
            />
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
        <ChartText contents={textNodesByGroup['frozen-days']} />

        <ChartTitle
          main={t('frozenDays') /* i18next-extract-disable-line */}
          sub={dataCharts.frozenDays.meta}
        />
        <CustomLineChart {...dataCharts.frozenDays} color={seasonsColors[0]} />
      </TabPanel>

      <TabPanel value={currentTab} index="estival-days">
        <ChartText contents={textNodesByGroup['estival-days']} />

        <ChartTitle
          main={t('estivalDays') /* i18next-extract-disable-line */}
          sub={dataCharts.estivalDays.meta}
        />
        <CustomLineChart {...dataCharts.estivalDays} color={seasonsColors[2]} />
      </TabPanel>

      <TabsFooter />
    </Layout>
  );
};

export const query = graphql`
  query ($gridCode: String, $sourceType: String, $language: String) {
    allGridPointData(
      filter: { gridCode: { eq: $gridCode }, sourceType: { eq: $sourceType } }
      sort: { fields: json, order: ASC }
    ) {
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

    allTexts: allMarkdownRemark(
      filter: {
        frontmatter: {
          sourceType: { eq: $sourceType},
          locale: { eq: $language}
        }
      }
    ) {
      nodes {
        html
        frontmatter { dataType }
      }
    }
  }
`;

export default doRedirect(ClimateObservations);
