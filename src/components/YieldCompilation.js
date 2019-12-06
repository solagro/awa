import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core';

import CustomDataTable from './CustomDataTable';
import GridPointTabs from './GridPointTabs';
import Layout from './Layout';
import SEO from './Seo';

import doRedirect from '../hoc/doRedirect';
import {
  getQuartiles,
  getQuantileGroup,
} from '../lib/math';

const useStyles = makeStyles({
  quart1: { background: '#97d492' },
  quart2: { background: '#c6d799' },
  quart3: { background: '#dac5a0' },
  quart4: { background: '#dea8a8' },
});

const YieldCompilation = ({
  pageContext: { sourceType, gridCode },
  data: {
    allGridPointDataCell: {
      allKeys,
      allYears,
    },
  },
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  return (
    <Layout>
      <SEO title={t('Active site detailed information card')} lang={i18n.language} />

      <GridPointTabs sourceType={sourceType} gridCode={gridCode} />

      <CustomDataTable
        keys={allKeys}
        years={allYears}
        renderCell={({ key, value, col }) => {
          const quartiles = getQuartiles(col);
          const groupe = getQuantileGroup(value, quartiles);
          const className = classes[`quart${groupe}`];

          return (
            <TableCell key={key} className={className}>
              {value}
            </TableCell>
          );
        }}
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

export default doRedirect(YieldCompilation);
