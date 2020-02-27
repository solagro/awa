import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CustomDataTable from './CustomDataTable';
import GridPointTabs from './GridPointTabs';
import Layout from './Layout';
import Link from './Link';
import MarkdownText from './MarkdownText';
import SEO from './Seo';


import doRedirect from '../hoc/doRedirect';

const YieldCompilation = ({
  pageContext: { sourceType, gridCode },
  data: {
    gridPointData: { json },
    markdownRemark: { htmlAst } = {},
  },
}) => {
  const { t, i18n } = useTranslation();

  const data = JSON.parse(json);

  return (
    <Layout>
      <SEO title={t('Active site detailed information card')} lang={i18n.language} />
      <Typography variant="h1" gutterBottom align="center">{t('Active site detailed information card')}</Typography>
      <GridPointTabs sourceType={sourceType} gridCode={gridCode} />

      <MarkdownText hast={htmlAst} />

      <CustomDataTable data={data} quartiles min max average />

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
        style={{ margin: '1em 0' }}
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
  query ($gridCode: String, $sourceType: String, $language: String) {
    gridPointData(
      gridCode: { eq: $gridCode },
      sourceType: { eq: $sourceType }
    ) {
      json
    }

    markdownRemark(
      frontmatter: {
        sourceType: { eq: $sourceType },
        locale: { eq: $language }
      }
    ) {
      htmlAst
    }
  }
`;

export default doRedirect(YieldCompilation);
