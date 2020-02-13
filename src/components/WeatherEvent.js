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

  const getEventId = e => {
    const eventObject = catalog.weather_event.find(({ value }) => (value === e));
    if (eventObject) {
      return eventObject.id;
    }

    return e;
  };

  return (
    <div>
      <img
        src={`/images/weather-events/STRESS_${getEventId(event)}.png`}
        alt={event}
        style={{ width: '4em' }}
      />
      {period}
    </div>
  );
};

export default WeatherEvent;
