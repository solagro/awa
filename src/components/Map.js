import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';

const isLive = typeof window !== 'undefined';

const MapboxGL = isLive
  ? ReactMapboxGl({
    accessToken: 'pk.eyJ1Ijoic29sYWdyb2F3YSIsImEiOiJjazM3NnQyczgwOGpzM2Jubm9wNmttdGExIn0.F3vb1XtTBJ-eQNfin_ew7g',
  })
  : () => null;

const Map = () => (
  <MapboxGL
    // eslint-disable-next-line react/style-prop-object
    style="mapbox://styles/mapbox/streets-v8"
    containerStyle={{ height: 300 }}
  />
);

export default Map;
