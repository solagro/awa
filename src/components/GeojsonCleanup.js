import React from 'react';
import { useTranslation } from 'react-i18next';

// import { kml } from '@tmcw/togeojson';
import geojsonPrecision from 'geojson-precision';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

import FileDrop from './FileDrop';
import { readFiles } from '../lib/files';

const compose = (...funcs) => {
  if (funcs.length === 0) { return arg => arg; }
  if (funcs.length === 1) { return funcs[0]; }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
};

const sortFeaturesBy = property => ({ features, ...fRest }) => ({
  ...fRest,
  features: features.sort(
    (
      { properties: { [property]: a } },
      { properties: { [property]: b } },
    ) => a.localeCompare(b),
  ),
});

const filterFeaturesProperties = (whiteList = [], transformValue = v => v) =>
  ({ features, ...fRest }) => ({
    ...fRest,
    features: features.map(({ properties, ...pRest }) => ({
      ...pRest,
      properties: Object.fromEntries(
        Object.entries(properties)
          .filter(([key]) => whiteList.includes(key))
          .map(([key, value]) => [key, transformValue(value)]),
      ),
    })),
  });

const useStyles = makeStyles(theme => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  drop: {
    padding: '1em',
    border: '5px dashed rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '1em',
    '&.active': {
      borderColor: 'rgba(0, 200, 0, 0.85)',
    },
  },
  downloadContainer: {
    textAlign: 'center',
    marginBottom: '1em',
  },
  download: {
    margin: '0.5em auto',
  },
}));

const GeojsonCleanup = () => {
  const classes = useStyles();
  const [sourceFiles, setSourceFiles] = React.useState([]);
  const [downloads, setDownloads] = React.useState([]);

  const { t } = useTranslation();

  /* Generate CSVs */
  React.useEffect(() => {
    if (!sourceFiles.length) {
      /* Eearly return if no file */
      return;
    }

    (async () => {
      const processedFiles = await readFiles(sourceFiles, 'readAsText');

      const newDownloads = processedFiles.map(({ filename, content, ...rest }) => {
        // From xml raw strong to geojson blob, the functionnal way.
        const fileData = compose(
          // Convert String to Blob
          string => new Blob([string], { type: 'text/csv;charset=utf-8;' }),

          // Serialize to JSON
          object => JSON.stringify(object, null, 2),

          // Sort geojson feature by given property
          sortFeaturesBy('Grid_Code'),

          // Keep only Grid_Code property, transform value to String
          filterFeaturesProperties(['Grid_Code'], v => `${v}`),

          // Limit coords precision to 8 decimals with `geojson-precision`
          geojson => geojsonPrecision(geojson, 6),

          // Parse raw geojson content to Object
          json => JSON.parse(json),

          // Convert kml data to geojson with `@tmcw/togeojson`
          // kml,

          // Parse file content as XML with native DOMParser
          // xmlString => new DOMParser().parseFromString(xmlString, 'application/xml'),
        )(content);

        return {
          ...rest,
          download: 'map.geojson',
          href: window.URL.createObjectURL(fileData),
        };
      });

      setDownloads(newDownloads);
    })();
  }, [sourceFiles]);

  return (
    <div>
      <FileDrop
        className={classes.drop}
        onDrop={setSourceFiles}
        dropText={t('Drag \'n\' drop Geojson files, or click to select files')}
      >
        <div className={classes.chipContainer}>
          {sourceFiles.map(({ name }) => (
            <Chip key={name} label={name} />
          ))}
        </div>
      </FileDrop>

      {Boolean(downloads.length) && (
        <div className={classes.downloadContainer}>
          {downloads.map(({ download, href }) => (
            <Button
              key={download}
              className={classes.download}
              color="secondary"
              variant="outlined"
              href={href}
              download={download}
            >
              {download}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeojsonCleanup;
