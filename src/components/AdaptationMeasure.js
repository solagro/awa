/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Layout from './Layout';
import RiskRegion from './RiskRegion';
import SustainabilityComponents from './SustainabilityComponents';
import WeatherEvent from './WeatherEvent';

import doRedirect from '../hoc/doRedirect';

const AdaptationMeasure = ({
  data: {
    measure: { fields: { measure: measureProps } },
  },
}) => {
  const { t, i18n } = useTranslation();

  const useAlt = i18n.language === measureProps.alt_language;

  const altProperties = Object.entries(measureProps)
    .filter(([key]) => (key.substr(0, 4) === 'alt_'))
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key.substr(4)]: value,
    }), {});

  const measure = useAlt ? { ...measureProps, ...altProperties } : measureProps;

  return (
    <Layout modalWidth={800}>
      <div>
        <Typography variant="h1">{measure.name}</Typography>

        <Typography variant="h2">{t('Climate risk region')}</Typography>

        <RiskRegion
          region={measure.climate_risk_region}
          label={t(measure.climate_risk_region)}
          showName
        />

        <Typography variant="h2">{t('Weather event addressed')}</Typography>

        <WeatherEvent
          event={measure.weather_event}
          period={t(measure.weather_event_season_or_period)}
        />

        <WeatherEvent
          event={measure._2nd_weather_event}
          period={t(measure._2nd_weather_event_season_or_period)}
        />

        <Typography variant="h2">{t('Farming system')}</Typography>

        {t(measure.farming_system)}
        {t(measure.sub_system)}

        <Typography variant="h2">{t('Description')}</Typography>

        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: t(measure.description_of_the_measure) }}
        />

        <Typography variant="h2">{t('Comments on sustainability')}</Typography>

        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: t(measure.comments_on_sustainability) }}
        />

        <Card>
          <CardContent>
            <Typography variant="h2">{t('Implementation')}</Typography>

            {t(measure.implementation)}

            <Typography variant="h3">{t('Sustainability components')}</Typography>

            <SustainabilityComponents measure={measure} />
          </CardContent>
        </Card>
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
