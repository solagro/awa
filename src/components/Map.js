import React from 'react';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import { useTheme } from '@material-ui/core/styles';

const isLive = typeof window !== 'undefined';

const MapboxGL = isLive
  ? ReactMapboxGl({
    accessToken: 'pk.eyJ1Ijoic29sYWdyb2F3YSIsImEiOiJjazM3NnQyczgwOGpzM2Jubm9wNmttdGExIn0.F3vb1XtTBJ-eQNfin_ew7g',
  })
  : () => null;

const Map = () => {
  const theme = useTheme();
  return (
    <MapboxGL
      style="mapbox://styles/mapbox/streets-v8" // eslint-disable-line react/style-prop-object
      containerStyle={{ height: 500 }}
      center={[9, 50]}
      zoom={[4]}
    >
      <GeoJSONLayer
        data="/data/map.geojson"
        lineLayout={{
          'line-join': 'round',
          'line-cap': 'round',
        }}
        fillPaint={{
          'fill-opacity': 0.8,
          'fill-color': theme.palette.secondary.main,
        }}
        linePaint={{
          'line-color': theme.palette.secondary.light,
          'line-width': 3,
        }}
      />
    </MapboxGL>
  );
};

export default Map;
