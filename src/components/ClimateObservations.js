import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import GridPointTabs from './GridPointTabs';
import Layout from './Layout';
import Link from './Link';
import SEO from './Seo';

import doRedirect from '../hoc/doRedirect';
import { parseData } from '../lib/dataTable';


const ClimateObservations = ({
  pageContext: { sourceType, gridCode },
  data: { allGridPointData: { nodes } },
}) => {
  const { t, i18n } = useTranslation();

  const dataCharts = nodes.map(({ dataType, json }) => ({
    dataType,
    ...parseData(json),
  }));

  return (
    <Layout>
      <SEO title={t('Active site detailed information card')} lang={i18n.language} />
      <Typography variant="h1" gutterBottom align="center">{t('Active site detailed information card')}</Typography>
      <GridPointTabs sourceType={sourceType} gridCode={gridCode} />

      {dataCharts.map(({ dataType, data, headers }) => (
        <div key={dataType}>
          <h3>{dataType}</h3>
          <LineChart
            width={764}
            height={364}
            data={data}
            margin={{
              top: 16, right: 32, left: 32, bottom: 32,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            {/* i18next-extract-disable-next-line */}
            <Tooltip formatter={(value, name) => ([value, t(name)])} />
            {headers.map(key => (
              <Line type="monotone" key={key} dataKey={key} stroke="#8a2542" />
            ))}
          </LineChart>
        </div>
      ))}

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
