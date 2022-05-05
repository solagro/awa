import React from 'react';
import { navigate, useStaticQuery, graphql } from 'gatsby';
import ReactMapboxGl, { MapContext, GeoJSONLayer, ZoomControl, RotationControl } from 'react-mapbox-gl';
import { useTranslation } from 'react-i18next';

import { useTheme, useMediaQuery } from '@material-ui/core';

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
 * Map component
 */
const Map = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
  /**
   * @function
   * Navigate to first feature page
   *
   * @param {string} lng Language used as localized route prefix
   * @param {Map} map MapboxGL map instance
   * @param {Object} event.point Mapbox Point instance
   */
  const gotoGridCode = (lng, availableGridPoints = []) => (map, { point }) => {
    if (!availableGridPoints || !availableGridPoints.length) {
      return;
    }

    const features = map.queryRenderedFeatures(point);
    const gridCode = getFirstGridCode(features);

    if (gridCode && availableGridPoints.includes(gridCode)) {
      navigate(`/${lng}/map/${gridCode}/yield-compilation/`, { state: { modal: isLargeScreen } });
    } else {
      // eslint-disable-next-line no-console
      console.info('No page available for gridCode:', gridCode);
    }
  };

  const { allGridPointData: { group: gridPoints } } = useStaticQuery(graphql`
    query {
      allGridPointData {
        group(field: gridCode) {
          gridCode: fieldValue
        }
      }
    }
  `);
  const availableGridPoints = gridPoints.map(({ gridCode }) => `${gridCode}`);

  if (!isLive) {
    return null;
  }

  const GridPointColorExpression = (value, defaultValue) => [
    'match',
    ['get', 'Grid_Code'],
    availableGridPoints,
    value,
    defaultValue,
  ];

  const activateCursorAccordingAvailability = ({ features, ...rest }) => {
    const [feature] = features;

    if (feature
      && feature.properties
      && availableGridPoints.includes(feature.properties.Grid_Code)) {
      activateCursor(rest);
    }
  };

  return (
    <MapboxGL
      style="mapbox://styles/mapbox/satellite-streets-v9" // eslint-disable-line react/style-prop-object
      containerStyle={{ height: '100vh' }}
      center={[9, 50]}
      zoom={[4]}
      onMouseMove={resetCursor}
      onClick={gotoGridCode(i18n.language, availableGridPoints)}
    >
      <MapContext.Consumer>
        {map => {
          const { layers } = map.getStyle();
          const labelLayers = layers.filter(({ id }) => id.includes('label'));
          labelLayers.forEach(({ id }) => {
            map.setLayoutProperty(id, 'text-field', ['get', `name_${i18n.language}`]);
          });
        }}
      </MapContext.Consumer>

      <ZoomControl />
      <RotationControl />
      <GeoJSONLayer
        data="/data/map.geojson"
        lineLayout={{
          'line-join': 'round',
          'line-cap': 'round',
        }}
        fillPaint={{
          'fill-opacity': GridPointColorExpression(0.8, 0.1),
          'fill-color': GridPointColorExpression(theme.palette.secondary.main, '#ccc'),
        }}
        linePaint={{
          'line-color': GridPointColorExpression(theme.palette.secondary.main, '#ccc'),
          'line-opacity': GridPointColorExpression(1, 0.5),
          'line-width': GridPointColorExpression(2, 1),
        }}
        fillOnMouseMove={activateCursorAccordingAvailability}
        lineOnMouseMove={activateCursorAccordingAvailability}
      />
    </MapboxGL>
  );
};

export default Map;
