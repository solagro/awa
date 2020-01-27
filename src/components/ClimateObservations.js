import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import GridPointTabs from './GridPointTabs';
import ClimateObservationsTabs from './ClimateObservationsTabs';
import ClimateObservationsPanel from './ClimateObservationsPanel';
import Layout from './Layout';
import Link from './Link';
import SEO from './Seo';

import doRedirect from '../hoc/doRedirect';

const ClimateObservations = ({
  pageContext: { sourceType, gridCode },
  data: {
    allGridPointData: { nodes },
    allDataTypes,
  },
}) => {
  const { t, i18n } = useTranslation();

  const dataTypes = allDataTypes.group.map(({ dataType }) => dataType);

  const [value, setValue] = React.useState(0);

  const getCurrentDataType = (currentDataType, val) => (currentDataType.includes(val) && val);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getDataTypeJson = currentDataType => (
    JSON.parse(nodes.find(({ dataType }) => (currentDataType === dataType)).json)
  );
  return (
    <Layout>
      <SEO title={t('Active site detailed information card')} lang={i18n.language} />
      <Typography variant="h1" gutterBottom align="center">{t('Active site detailed information card')}</Typography>
      <GridPointTabs sourceType={sourceType} gridCode={gridCode} />
      <ClimateObservationsTabs
        dataTypes={dataTypes}
        handleChange={handleChange}
        gridCode={gridCode}
      />
      {dataTypes.map(currentDataType => (
        <ClimateObservationsPanel
          currentDataType={getCurrentDataType(currentDataType, value)}
          data={getDataTypeJson(currentDataType)}
        />
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
