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
  const [geojson, setGeojson] = React.useState(undefined);
  const theme = useTheme();

  React.useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const rawData = await fetch('/data/map.geojson');
      const data = await rawData.json();

      if (!isMounted) {
        return;
      }

      setGeojson(data);
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <MapboxGL
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/streets-v8"
      containerStyle={{ height: 500 }}
      center={[9, 50]}
      zoom={[4]}
    >
      {geojson && (
        <GeoJSONLayer
          data={geojson}
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
      )}
    </MapboxGL>
  );
};

export default Map;
