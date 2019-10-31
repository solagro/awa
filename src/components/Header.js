import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

const Header = ({ siteTitle }) => {
  const classes = useStyles();
  const { i18n } = useTranslation();

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="div">
        {siteTitle}
      </Typography>

      <Typography variant="h6" component="div">
        ({i18n.language})
      </Typography>
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
