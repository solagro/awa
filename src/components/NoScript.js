import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Link from '@material-ui/core/Link';

import locales from '../locales';
import adaptPathname from '../lib/adaptPathname';

const languages = Object.keys(locales);
const languageNames = {
  fr: 'French',
  en: 'English',
  de: 'German',
  et: 'Estonian',
  es: 'Spanish',
};

const NoScript = () => (
  <ul>
    {languages.map(language => (
      <li key={language}>
        <Link component={GatsbyLink} to={adaptPathname('/', language)}>
          {`Browse the site in ${languageNames[language]}`}
        </Link>
      </li>
    ))}
  </ul>
);

export default NoScript;
