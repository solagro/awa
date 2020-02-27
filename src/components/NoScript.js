import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

import locales from '../locales';
import adaptPathname from '../lib/adaptPathname';

const useStyles = makeStyles({
  list: {
    listStyle: 'none',

    height: '100vh',
    margin: 0,
    padding: 0,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    animation: '$fadein 2s',
  },
  '@keyframes fadein': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  listItem: {
    margin: 0,
    padding: 0,
  },
});

const languages = Object.keys(locales);
const languageNames = {
  fr: 'French',
  en: 'English',
  de: 'German',
  et: 'Estonian',
  es: 'Spanish',
};

const NoScript = () => {
  const classes = useStyles();

  return (
    <ul className={classes.list}>
      {languages.map(language => (
        <li key={language} className={classes.listItem}>
          <Link component={GatsbyLink} to={adaptPathname('/', language)}>
            {`Browse the site in ${languageNames[language]}`}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NoScript;
