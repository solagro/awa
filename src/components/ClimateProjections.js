import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';

import CustomDataTable from './CustomDataTable';
import GridPointTabs from './GridPointTabs';
import Layout from './Layout';
import SEO from './Seo';
import TabsFooter from './TabsFooter';

import doRedirect from '../hoc/doRedirect';

const ClimateProjections = ({
  pageContext: { sourceType, gridCode },
  data: {
    allGridPointData: { nodes },
    allDataTypes,
  },
}) => {
  const { t, i18n } = useTranslation();

  const dataTypes = allDataTypes.group.map(({ dataType }) => dataType);

  return (
    <Layout>
      <SEO title={t('Active site detailed information card')} lang={i18n.language} />
      <Typography variant="h1" gutterBottom align="center">{t('Active site detailed information card')}</Typography>
      <GridPointTabs sourceType={sourceType} gridCode={gridCode} />

      {dataTypes.map(currentDataType => (
        <div key={currentDataType}>
          <h3>{currentDataType}</h3>
          <CustomDataTable
            data={JSON.parse(nodes.find(({ dataType }) => (currentDataType === dataType)).json)}
          />
        </div>
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
