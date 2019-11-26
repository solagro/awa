import React from 'react';
import { navigate } from 'gatsby';
import ReactMapboxGl, { GeoJSONLayer, ZoomControl, RotationControl } from 'react-mapbox-gl';
import { useTranslation } from 'react-i18next';

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

/**
 * @function
 * Returns the grid code of the first given feature list
 *
 * @param {Array} [feature] Array of features
 * @returns {string} The gris code
 */
const getFirstGridCode = ([feature]) => {
  if (feature && feature.properties && feature.properties.Grid_Code) {
    return feature.properties.Grid_Code;
  }

  return undefined;
};

/**
 * @function
 * Navigate to first feature page
 *
 * @param {string} lng Language used as localized route prefix
 * @param {Map} map MapboxGL map instance
 * @param {Object} event.point Mapbox Point instance
 */
const gotoGridCode = lng => (map, { point }) => {
  const features = map.queryRenderedFeatures(point);
  const gridCode = getFirstGridCode(features);

  if (gridCode) {
    navigate(`/${lng}/map/${gridCode}/yield-compilation/`);
  }
};

/**
 * Map component
 */
const Map = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();

  return (
    <MapboxGL
      style="mapbox://styles/mapbox/streets-v8" // eslint-disable-line react/style-prop-object
      containerStyle={{ height: 500 }}
      center={[9, 50]}
      zoom={[4]}
      onMouseMove={resetCursor}
      onClick={gotoGridCode(i18n.language)}
    >
      <ZoomControl />
      <RotationControl />
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
