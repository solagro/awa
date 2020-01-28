import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Link from './Link';

export default () => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Button
          variant="outlined"
          component={Link}
          to="/adaptations"
        >
          {t('See measures')}
        </Button>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/map"
        >
          {t('Return to map')}
        </Button>
      </Grid>
    </Grid>
  );
};
