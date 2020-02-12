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
              <CustomLineChart {...dataCharts[group]} key={header} dataKeys={[header]} />
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

export default doRedirect(ClimateProjections);
