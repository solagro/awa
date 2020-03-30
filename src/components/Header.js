import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import LanguageSwitcher from './LanguageSelector';

const useStyles = makeStyles(theme => ({
  header: {
    height: 88,
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  logo: {
    width: 112,
  },
}));

const Header = ({ siteTitle, parentSite, logo, preventDefault }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container direction="row" justify="space-between" alignItems="flex-start" className={classes.header}>
      <a target="_blank" rel="noopener noreferrer nofollow" href={parentSite} onClick={preventDefault}>
        <img
          className={classes.logo}
          src={logo}
          alt={t(siteTitle)} // i18next-extract-disable-line
        />
      </a>

      <LanguageSwitcher />
    </Grid>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  parentSite: PropTypes.string,
  logo: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
  parentSite: '#',
  logo: '',
};

export default Header;
