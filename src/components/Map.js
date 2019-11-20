import React from 'react';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import { useTheme } from '@material-ui/core/styles';

const isLive = typeof window !== 'undefined';

const MapboxGL = isLive
  ? ReactMapboxGl({
    accessToken: 'pk.eyJ1Ijoic29sYWdyb2F3YSIsImEiOiJjazM3NnQyczgwOGpzM2Jubm9wNmttdGExIn0.F3vb1XtTBJ-eQNfin_ew7g',
  })
  : () => null;

/**
 * @function
 * Set map cursor to pointer
 *
 * @param {Object} event.originalEvent.target Target of event as Mapbox map DOM instance
 */
const activateCursor = ({ originalEvent: { target } = {} } = {}) => {
  // eslint-disable-next-line no-param-reassign
  target.style.cursor = 'pointer';
};

/**
 * @function
 * Set map cursor to grabbing hand
 *
 * @param {Map} map Mapbox map instance
 */
const resetCursor = map => {
  // eslint-disable-next-line no-param-reassign
  map.getCanvas().style.cursor = 'grab';
};

const Map = () => {
  const theme = useTheme();
  return (
    <MapboxGL
      style="mapbox://styles/mapbox/streets-v8" // eslint-disable-line react/style-prop-object
      containerStyle={{ height: 500 }}
      center={[9, 50]}
      zoom={[4]}
      onMouseMove={resetCursor}
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
        fillOnMouseMove={activateCursor}
        lineOnMouseMove={activateCursor}
      />
    </MapboxGL>
  );
};

export default Map;
