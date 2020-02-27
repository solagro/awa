import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStaticQuery, graphql } from 'gatsby';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import CustomIcon from './CustomIcon';

const useStyles = makeStyles({
  box: {
    // border: '1px solid red',
    textAlign: 'center',
    marginRight: '.5em',
  },
});

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
  const classes = useStyles();

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
      <Box className={classes.box}>
        {['2', '3', '4', '7'].map(id => (
          <CustomIcon
            key={id}
            src={`/images/weather-events/STRESS_${id}.png`}
            label={t(getEventName(id))}
            showTooltip
            inline
          />
        ))}
        <Box>{period}</Box>
      </Box>
    );
  }

  return (
    <Box className={classes.box}>
      <CustomIcon
        src={`/images/weather-events/STRESS_${eventId}.png`}
        label={t(event)}
        showTooltip
      />
      {period}
    </Box>
  );
};

export default WeatherEvent;
