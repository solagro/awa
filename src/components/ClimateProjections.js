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

import { CustomLineChart, ChartTitle, ChartText } from './Charts';

import doRedirect from '../hoc/doRedirect';
import { parseData } from '../lib/dataTable';

const ClimateProjections = ({
  pageContext: { sourceType, gridCode },
  data: {
    allGridPointData: { nodes: chartNodes },
    allTexts: { nodes: textNodes },
  },
}) => {
  const { t, i18n } = useTranslation();

  const [currentTab, setCurrentTab] = React.useState('generalities');
  const handleTabChange = (event, newValue) => setCurrentTab(newValue);

  const dataCharts = chartNodes.reduce((acc, { dataType, json }) => ({
    ...acc,
    [dataType]: parseData(json),
  }), {});

  const groups = {
    generalities: t('generalities'),
    crops: t('crops'),
    fodder: t('fodder'),
    animal: t('animal'),
    vineyardFruit: t('vineyardFruit'),
  };

  const getIndicatorColor = iac => {
    const colors = {
      G1: '#08519c',
      G2: '#3f95d3',
      G3: '#08519c',
      G4: '#08519c',
      G5: '#fd8d3c',
      G6: '#bb0012',
      G7: '#86530b',
      G8: '#ffce1a',
      G9: '#ffce1a',
      G10: '#749eb6',

      // Crops
      C1: '#000000',
      C2: '#000000',
      C3: '#000000',
      C12: '#000000',

      M1: '#fd8d3c',
      M2: '#fd8d3c',
      M8: '#fd8d3c',

      Co2: '#ffce1a',
      Co3: '#ffce1a',

      // Fodder
      F1: '#006700',
      F3: '#006700',
      M4: '#006700',

      // Animals
      A1: '#08519c',
      A2: '#08519c',
      A3: '#08519c',

      // Fruits & Vineyards
      V1: '#6f006c',
      V2: '#6f006c',
      V3: '#6f006c',
      V9: '#6f006c',
    };

    return colors[iac] || '#8a2542';
  };

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

      {Object.keys(groups).map(group => (
        <TabPanel value={currentTab} index={group} key={group}>
          <ChartText contents={textNodesByGroup[group]} />

          {dataCharts[group].headers.map(header => (
            <div key={header} style={{ marginTop: '2em' }}>
              {/* i18next-extract-disable-next-line */}
              <ChartTitle main={t(header)} sub={t(dataCharts[group].meta[header])} />
              <CustomLineChart
                {...dataCharts[group]}
                key={header}
                dataKeys={[header]}
                color={getIndicatorColor(header)}
              />
            </div>
          ))}
        </TabPanel>
      ))}

      <TabsFooter />
    </Layout>
  );
};

export const query = graphql`
  query ($gridCode: String, $sourceType: String, $language: String) {
    allGridPointData(
      filter: { gridCode: { eq: $gridCode }, sourceType: { eq: $sourceType } }
      sort: { fields: [gridCode, dataType] }
    ) {
      nodes {
        dataType
        json
      }
    }

    allTexts: allMarkdownRemark(
      sort: { fields: fileAbsolutePath }
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

export default doRedirect(ClimateProjections);
