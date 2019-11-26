import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Link from './Link';

const useStyles = makeStyles(theme => ({
  footer: {
    borderTop: '4px solid #acd9e9',
    backgroundColor: '#ffffff',
    marginLeft: theme.spacing(8),
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
  },
}));

const Footer = ({ buildTime }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      className={classes.footer}
      spacing={3}
    >
      <Grid item xs={12} md={4}>
        <Typography variant="h2">{t('Partnership')}</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h2">
          {t('Contacts')}
        </Typography>
        <Typography variant="body1" paragraph>
          info@agriadapt.eu
        </Typography>

        <Typography variant="h3">
          Bodensee- Stiftung (Lake Constance Foundation)
        </Typography>
        <Typography variant="body1" paragraph>
          Patrick Trötschler : patrick.troetschler@bodensee-stiftung.org
          <Typography variant="body1" component="br" />
          Carolina Wackerhagen : Carolina.wackerhagen@bodensee-stiftung.org
        </Typography>


        <Typography variant="h3">
          Eesti Maaülikool (Estonian University of Life Sciences)
        </Typography>
        <Typography variant="body1" paragraph>
         Ragnar Leming : Ragnar.Leming@emu.ee
        </Typography>

        <Typography variant="h3">
          Fundación Global Nature
        </Typography>
        <Typography variant="body1" paragraph>
          Vanessa Sánchez : vsanchez@fundacionglobalnature.org
        </Typography>

        <Typography variant="h3">
          Solagro
        </Typography>
        <Typography variant="body1" paragraph>
          Nicolas Métayer : Nicolas.metayer@solagro.asso.fr
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Link to="/legal">
          <Typography variant="h2">{t('Legal')}</Typography>
        </Link>
        <span>{t('Last build ')}{buildTime}</span>
      </Grid>
    </Grid>
  );
};
export default Footer;
