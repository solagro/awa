import React from 'react';
import { navigate } from 'gatsby';
import Helmet from 'react-helmet';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router';

import i18n from '../i18n';
import adaptPathname from '../lib/adaptPathname';

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

          return (
            <Helmet>
              <meta httpEquiv="refresh" content={`0;url=${target}`} />
            </Helmet>
          );
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
