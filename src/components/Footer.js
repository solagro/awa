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
    padding: theme.spacing(2),
    marginLeft: theme.spacing(8),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  footer__partnership: {
    flexWrap: 'wrap',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    img: {
      marginBottom: 0,
    },
  },
  footer__partnership_text: {
    display: 'flex',
    alignItems: 'center',
  },
  footer__title: {
    marginTop: theme.spacing(6),
  },
}));

const Footer = () => {
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
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={6} lg={2} className={classes.footer__partnership_life}>
            <a target="_blank" rel="noopener noreferrer nofollow" href="https://ec.europa.eu/easme/en/life">
              <img className={classes.footer__logo} src="/images/logos/Life.jpg" alt="life logo" />
            </a>
          </Grid>
          <Grid item xs={6} lg={4} className={classes.footer__partnership_text}>
            <Typography variant="body1" paragraph>
              {t('With the contribution of the LIFE financial instrument of the European Union')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography variant="h2" gutterBottom>{t('Partnership and contacts')}</Typography>
        <Grid container spacing={6} className={classes.footer__partnership}>
          <Grid item xs={12} lg={12} className={classes.footer__logo}>
            <Typography variant="body1" paragraph>
              info@agriadapt.eu
            </Typography>
          </Grid>
          <Grid item xs={6} lg={3} className={classes.footer__logo}>
            <a target="_blank" rel="noopener noreferrer nofollow" href="http://www.bodensee-stiftung.org">
              <img src="/images/logos/LCF.jpg" alt="LCF logo" />
            </a>
            <Typography variant="h3">
              Bodensee- Stiftung (Lake Constance Foundation)
            </Typography>
            <Typography variant="body1" paragraph>
              Patrick Trötschler : patrick.troetschler@bodensee-stiftung.org
              <Typography variant="body1" component="br" />
              Carolina Wackerhagen : Carolina.wackerhagen@bodensee-stiftung.org
            </Typography>
          </Grid>
          <Grid item xs={6} lg={3} className={classes.footer__logo}>
            <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.emu.ee/en">
              <img src="/images/logos/EMU.jpg" alt="EMU logo" />
            </a>
            <Typography variant="h3">
              Eesti Maaülikool (Estonian University of Life Sciences)
            </Typography>
            <Typography variant="body1" paragraph>
              Ragnar Leming : Ragnar.Leming@emu.ee
            </Typography>
          </Grid>
          <Grid item xs={6} lg={3} className={classes.footer__logo}>
            <a target="_blank" rel="noopener noreferrer nofollow" href="https://fundacionglobalnature.org">
              <img src="/images/logos/FGN.jpg" alt="FGN logo" />
            </a>
            <Typography variant="h3">
              Fundación Global Nature
            </Typography>
            <Typography variant="body1" paragraph>
              Vanessa Sánchez : vsanchez@fundacionglobalnature.org
            </Typography>
          </Grid>
          <Grid item xs={6} lg={3} className={classes.footer__logo}>
            <a target="_blank" rel="noopener noreferrer nofollow" href="https://solagro.org">
              <img src="/images/logos/Solagro.jpg" alt="Solagro logo" />
            </a>
            <Typography variant="h3">
              Solagro
            </Typography>
            <Typography variant="body1" paragraph>
              Nicolas Métayer : Nicolas.metayer@solagro.asso.fr
            </Typography>
          </Grid>
          <Grid item xs={12} lg={11} className={classes.footer__logo}>
            <Typography variant="body1" paragraph>
              {t('Funding for the revision of the AWA Webtool within the framework')}
            </Typography>
            <Link to="/legal">
              <Typography variant="h2" gutterBottom className={classes.footer__title}>{t('Legal')}</Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Footer;
