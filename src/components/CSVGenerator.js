import React from 'react';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

import FileDrop from './FileDrop';
import { readFiles, buildData, buildZip } from '../lib/files';

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

const CSVGenerator = () => {
  const classes = useStyles();
  const [sourceFiles, setSourceFiles] = React.useState([]);
  const [zip, setZip] = React.useState();
  const [zipname, setZipname] = React.useState('default.zip');

  /* Generate CSVs */
  React.useEffect(() => {
    if (!sourceFiles.length) {
      /* Eearly return if no file */
      return;
    }

    (async () => {
      const processedFiles = buildData(await readFiles(sourceFiles));
      setZip(await buildZip(processedFiles));
    })();
  }, [sourceFiles]);

  React.useEffect(() => {
    setZipname(new Date().toISOString().replace(/:|T/g, '-').split('.')[0]);
  }, [zip]);

  return (
    <div>
      <FileDrop className={classes.drop} onDrop={setSourceFiles}>
        <div className={classes.chipContainer}>
          {sourceFiles.map(({ name }) => (
            <Chip key={name} label={name} />
          ))}
        </div>
      </FileDrop>

      {zip && (
        <div className={classes.downloadContainer}>
          <Button
            className={classes.download}
            color="secondary"
            href={zip}
            download={`${zipname}.zip`}
            variant="outlined"
          >
            Download zip file
          </Button>
        </div>
      )}
    </div>
  );
};

export default CSVGenerator;
