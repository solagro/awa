import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

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

  const eventId = getEventId(event);

  if (eventId === '8') {
    return ['2', '3', '4', '7'].map(id => (
      <img
        src={`/images/weather-events/STRESS_${id}.png`}
        alt={event}
        style={{ width: '4em' }}
      />
    ));
  }

  return (
    <div>
      <img
        src={`/images/weather-events/STRESS_${eventId}.png`}
        alt={event}
        style={{ width: '4em' }}
      />
      {period}
    </div>
  );
};

export default WeatherEvent;
