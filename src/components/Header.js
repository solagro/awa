import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  header: {
    height: 88,
  },
  logo: {
    width: 112,
  },
});

const Header = ({ siteTitle, parentSite, logo, preventDefault }) => {
  const classes = useStyles();
  const { i18n } = useTranslation();

  return (
    <Grid container direction="row" justify="space-between" className={classes.header}>
      <Link href={parentSite} onClick={preventDefault}>
        <img className={classes.logo} src={logo} alt={siteTitle} />
      </Link>

      <Typography variant="h6" component="div">
        ({i18n.language})
      </Typography>
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
