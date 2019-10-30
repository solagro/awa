import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router';
import { useTranslation } from 'react-i18next';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { navigate } from 'gatsby';

import adaptPathname from '../lib/adaptPathname';

const languages = [
  { id: 'de', label: 'deutsch' },
  { id: 'es', label: 'español' },
  { id: 'et', label: 'eesti keel' },
  { id: 'fr', label: 'français' },
  { id: 'en', label: 'english' },
];

const LanguageSwitcherMenu = props => {
  const { onClose, selectedValue, open } = props;
  const { t, i18n } = useTranslation();

  const handleClose = () => onClose(selectedValue);
  const handleChoice = (language, pathname) => {
    onClose(language);
    navigate(adaptPathname(pathname, language));
  };

  return (
    <Location>
      {({ location: { pathname } }) => (
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle id="simple-dialog-title">{t('Choose a language')}</DialogTitle>
          <List>
            {languages.map(({ id, label }) => (
              <ListItem
                key={id}
                button
                onClick={() => handleChoice(id, pathname)}
                selected={i18n.language === id}
              >
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        </Dialog>
      )}
    </Location>
  );
};

LanguageSwitcherMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default LanguageSwitcherMenu;
