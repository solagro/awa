import React from 'react';
import { navigate } from 'gatsby';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router';

import i18n from '../i18n';
import adaptPathname from '../lib/adaptPathname';
import NoScript from '../components/NoScript';

const isLive = typeof window !== 'undefined';

const doRedirect = WrappedComponent => props => {
  const { pageContext } = props;

  if (!pageContext.language) {
    return (
      <Location>
        {({ location: { pathname } }) => {
          const target = adaptPathname(pathname, i18n.language);

          if (isLive) {
            navigate(target);
            return null;
          }

          return <NoScript />;
        }}
      </Location>
    );
  }

  if (pageContext.language !== i18n.language) {
    i18n.changeLanguage(pageContext.language);
  }

  return <WrappedComponent {...props} />;
};

export default doRedirect;
