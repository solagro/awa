import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';
// import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core';

import CustomDataTable from './CustomDataTable';
import GridPointTabs from './GridPointTabs';
import Layout from './Layout';
import Link from './Link';
import SEO from './Seo';

import doRedirect from '../hoc/doRedirect';
// import {
//   getQuartiles,
//   getQuantileGroup,
// } from '../lib/math';

// const useStyles = makeStyles({
//   quart1: { background: '#dea8a8' },
//   quart2: { background: '#dac5a0' },
//   quart3: { background: '#c6d799' },
//   quart4: { background: '#97d492' },
//   cell: { textAlign: 'right' },
// });

// const toNumber = str => (str ? Number(str.replace(/,/, '.')) : undefined);

const YieldCompilation = ({
  pageContext: { sourceType, gridCode },
  data: { gridPointData: { json } },
}) => {
  const { t, i18n } = useTranslation();
  // const classes = useStyles();

  const data = JSON.parse(json);

  return (
    <Layout>
      <SEO title={t('Active site detailed information card')} lang={i18n.language} />
      <Typography variant="h1" gutterBottom align="center">{t('Active site detailed information card')}</Typography>
      <GridPointTabs sourceType={sourceType} gridCode={gridCode} />

      <CustomDataTable data={data} />

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Button
            variant="outlined"
            component={Link}
            to="/adaptations"
          >
            {t('See measures')}
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/map"
          >
            {t('Return to map')}
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query ($gridCode: String, $sourceType: String) {
    gridPointData(
      gridCode: { eq: $gridCode },
      sourceType: { eq: $sourceType }
    ) {
      json
    }
  }
`;

export default doRedirect(YieldCompilation);
