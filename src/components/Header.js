import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Link } from 'gatsby';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';

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
  language__container: {
    display: 'flex',
    alignItems: 'center',
  },
  language__select_list: {
    padding: 0,
  },
  language__select_menu: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  language__select_picto: {
    margin: 0,
    marginRight: theme.spacing(2),
  },
}));

const Header = ({ siteTitle, parentSite, logo, preventDefault }) => {
  const classes = useStyles();
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid container direction="row" justify="space-between" alignItems="flex-start" className={classes.header}>
      <a href={parentSite} onClick={preventDefault}>
        <img className={classes.logo} src={logo} alt={siteTitle} />
      </a>
      <div className={classes.language__container}>
        <img className={classes.language__select_picto} src="/images/language.svg" alt={t('language')} />
        <List component="nav" aria-label={t('language selector')}>
          <ListItem
            className={classes.language__select_list}
            button
            aria-haspopup="true"
            aria-controls="language_selector"
            aria-label={t('choose your language')}
            onClick={handleClickListItem}
          >
            <Paper className={classes.language__select_menu} elevation={4}>
              <ListItemText primary={t(i18n.language)} /* i18next-extract-disable-line */ />
            </Paper>
          </ListItem>
        </List>

        <Menu
          id="language_selector"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Location>
            {({ location: { pathname } }) => (
              languageIds.map(language => (
                <MenuItem value={language} key={language}>
                  <Link to={adaptPathname(pathname, language)} lang={language}>
                    {t(language) /* i18next-extract-disable-line */}
                  </Link>
                </MenuItem>
              ))
            )}
          </Location>
        </Menu>
      </div>
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
