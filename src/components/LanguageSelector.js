import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'gatsby';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router';

import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';

import LangagePicto from './LangagePicto';
import adaptPathname from '../lib/adaptPathname';
import locales from '../locales';
import languages from '../locales/languages';

const languageIds = Object.keys(locales);

const useStyles = makeStyles(theme => ({
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: theme.spacing(18),
  },
  language__select_picto: {
    margin: 0,
    marginRight: theme.spacing(1),
  },
}));

const LanguageSwitcher = () => {
  const classes = useStyles();
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickListItem = event => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <div className={classes.language__container}>
      <LangagePicto className={classes.language__select_picto} style={{ color: '#ACD9E9' }} />
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
            <ListItemText primary={languages[i18n.language].ownName} />
            <ArrowDropDownIcon style={{ fontSize: 16 }} />
          </Paper>
        </ListItem>
      </List>

      <Location>
        {({ location: { pathname } }) => (
          <Menu
            id="language_selector"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {languageIds.map(language => (
              <MenuItem value={language} key={language}>
                <Link to={adaptPathname(pathname, language)} lang={language}>
                  {languages[language].ownName}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        )}
      </Location>
    </div>
  );
};

export default LanguageSwitcher;
