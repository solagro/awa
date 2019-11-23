import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import CustomDataTable from './CustomDataTable';
import Layout from './Layout';
import SEO from './Seo';

import doRedirect from '../hoc/doRedirect';

const ClimateProjection = ({
  data: {
    allGridPointDataCell: {
      allKeys,
      allYears,
    },
  },
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <SEO title={t('Active site detailed information card')} lang={i18n.language} />

      <CustomDataTable
        keys={allKeys}
        years={allYears}
      />
    </Layout>
  );
};

export const query = graphql`
  query ($gridCode: String, $sourceType: String) {
    allGridPointDataCell(filter: {gridCode: {eq: $gridCode}, sourceType: {eq: $sourceType}}) {
      allKeys: group(field: key) { fieldValue }
      allYears: group(field: year) {
        fieldValue
        nodes { value }
      }
    }
  }
`;

export default doRedirect(ClimateProjection);
