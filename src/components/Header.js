import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LanguageSwitcherMenu from './LanguageSwitcherMenu';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

const Header = ({ siteTitle }) => {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const [showLanguageSwitcher, setShowLanguageSwitcher] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="div">
        {siteTitle}
      </Typography>

      <Typography variant="h6" component="div">
        ({i18n.language})
      </Typography>

      <Button
        variant="contained"
        onClick={() => setShowLanguageSwitcher(true)}
      >
        {t('Change language')}
      </Button>
      <LanguageSwitcherMenu
        open={showLanguageSwitcher}
        onClose={() => setShowLanguageSwitcher(false)}
      />
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
