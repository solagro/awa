import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStaticQuery, graphql } from 'gatsby';

import Box from '@material-ui/core/Box';
import CustomIcon from './CustomIcon';

const WeatherEvent = ({ event, period }) => {
  const { catalog } = useStaticQuery(graphql`
    {
      catalog: adaptationsJson {
        weather_event {
          value
          id
        }
      }
    }
  `);

  const { t } = useTranslation();

  if (!event) {
    return null;
  }

  const getEventId = e => {
    const eventObject = catalog.weather_event.find(({ value }) => (value === e));
    if (eventObject) {
      return eventObject.id;
    }

    return e;
  };

  const getEventName = e => {
    const eventObject = catalog.weather_event.find(({ id }) => (id === e));
    if (eventObject) {
      return eventObject.value;
    }

    return e;
  };

  const eventId = getEventId(event);

  if (eventId === '8') {
    return (
      <Box>
        {['2', '3', '4', '7'].map(id => (
          <CustomIcon
            src={`/images/weather-events/STRESS_${id}.png`}
            label={t(getEventName(id))}
            showTooltip
            inline
          />
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <CustomIcon
        src={`/images/weather-events/STRESS_${eventId}.png`}
        label={event}
        showTooltip
      />
      {period}
    </Box>
  );
};

export default WeatherEvent;
