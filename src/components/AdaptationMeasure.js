/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Layout from './Layout';
import RiskRegion from './RiskRegion';
import SustainabilityComponents from './SustainabilityComponents';
import WeatherEvent from './WeatherEvent';

import doRedirect from '../hoc/doRedirect';

const useStyles = makeStyles(theme => ({
  mainTitle: {
    textAlign: 'center',
  },
  card: {
    float: 'right',
    background: '#fcf7e9',
    backgroundImage: 'url(/images/awa-background-2.svg)',
    backgroundPosition: 'right bottom',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    boxShadow: 'none',
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(-2.5),
    paddingRight: theme.spacing(2.5),
  },
  h2: {
    marginTop: '.5em',
  },
}));

const CustomTitle = ({
  h1,
  h2 = false,
  h3 = false,
  h4 = false,
  h5 = false,
  ...props
}) => {
  let variant = 'h1';
  if (h2) variant = 'h2';
  if (h3) variant = 'h3';
  if (h4) variant = 'h4';
  if (h5) variant = 'h5';
  return (
    <Typography variant={variant} gutterBottom {...props} />
  );
};

const CustomHTML = ({ html, ...props }) => (
  <Typography
    variant="body2"
    dangerouslySetInnerHTML={{ __html: html }}
    {...props}
  />
);

const AdaptationMeasure = ({
  data: {
    measure: { fields: { measure: measureProps } },
  },
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const useAlt = i18n.language === measureProps.alt_language;

  const altProperties = Object.entries(measureProps)
    .filter(([key]) => (key.substr(0, 4) === 'alt_'))
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key.substr(4)]: value,
    }), {});

  const measure = useAlt ? { ...measureProps, ...altProperties } : measureProps;

  return (
    <Layout modalWidth={950}>
      <div>
        <CustomTitle h1 className={classes.mainTitle}>{measure.name}</CustomTitle>

        <Card className={classes.card}>
          <CardContent>
            <CustomTitle h2>{t('Implementation')}</CustomTitle>

            <Box>{t(measure.implementation)}</Box>

            <CustomTitle h2 className={classes.h2}>{t('Sustainability components')}</CustomTitle>

            <SustainabilityComponents measure={measure} />
          </CardContent>
        </Card>

        <CustomTitle h2 className={classes.h2}>{t('Climate risk region')}</CustomTitle>

        <RiskRegion
          region={measure.climate_risk_region}
          label={t(measure.climate_risk_region)}
          showName
        />

        <CustomTitle h2 className={classes.h2}>{t('Weather event addressed')}</CustomTitle>

        <WeatherEvent
          event={measure.weather_event}
          period={t(measure.weather_event_season_or_period)}
        />

        <WeatherEvent
          event={measure._2nd_weather_event}
          period={t(measure._2nd_weather_event_season_or_period)}
        />

        <CustomTitle h2 className={classes.h2}>{t('Farming system')}</CustomTitle>

        <Box>{t(measure.farming_system)}</Box>
        <Box>{t(measure.sub_system)}</Box>

        <CustomTitle h2 className={classes.h2}>{t('Description')}</CustomTitle>

        <CustomHTML html={measure.description_of_the_measure} />

        <CustomTitle h2 className={classes.h2}>{t('Comments on sustainability')}</CustomTitle>

        <CustomHTML html={measure.comments_on_sustainability} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    measure: adaptationMeasures(id: { eq: $id }) {
      fields {
        measure {
          slug
          alt_language

          name
          alt_name

          farming_system

          farm_vulnerability_component

          climate_risk_region

          implementation

          sub_system
          alt_sub_system

          weather_event
          weather_event_season_or_period
          alt_weather_event_season_or_period

          _2nd_weather_event
          _2nd_weather_event_season_or_period
          alt_2nd_weather_event_season_or_period

          description_of_the_measure
          alt_description_of_the_measure

          comments_on_sustainability
          alt_comments_on_sustainability

          ghg_emissions
          air_quality
          soil
          water
          biodiversity
          animal_welfare
          economic
          social
          technical_feasibility
        }
      }
    }
  }
`;

export default doRedirect(AdaptationMeasure);
