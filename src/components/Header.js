import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Link } from 'gatsby';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import adaptPathname from '../lib/adaptPathname';
import locales from '../locales';

const languageIds = Object.keys(locales);

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
  const { i18n } = useTranslation();

  return (
    <Grid container direction="row" justify="space-between" className={classes.header}>
      <a href={parentSite} onClick={preventDefault}>
        <img className={classes.logo} src={logo} alt={siteTitle} />
      </a>


      <Grid item>
        <Typography variant="subtitle1" component="div">
        ({i18n.language})
        </Typography>
        <Location>
          {({ location: { pathname } }) => (
            languageIds.map(language => (
              <span key={language}>
                <Link to={adaptPathname(pathname, language)} lang={language}>{language}</Link>
                {'  '}
              </span>
            ))
          )}
        </Location>
      </Grid>

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
