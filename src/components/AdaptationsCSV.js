import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

import FileDrop from './FileDrop';
import { readFiles, buildData, removeExt } from '../lib/files';

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

const AdaptationsCSV = () => {
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
      const processedFiles = buildData(await readFiles(sourceFiles));

      const newDownloads = processedFiles.reduce((store, { filename, content }) =>
        [
          ...store,
          ...content.map(({ sheetname, csv }) => {
            const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const csvURL = window.URL.createObjectURL(csvData);
            return { download: `${removeExt(filename)}-${sheetname}.csv`, href: csvURL };
          }),
        ], []);

      setDownloads(newDownloads);
    })();
  }, [sourceFiles]);

  return (
    <div>
      <FileDrop
        className={classes.drop}
        onDrop={setSourceFiles}
        dropText={t('Drag \'n\' drop adaptation measures files, or click to select files')}
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

export default AdaptationsCSV;
