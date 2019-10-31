/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router';

import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';
import './Layout.css';

import locales from '../locales/all';
import adaptPathname from '../lib/adaptPathname';

const languageIds = Object.keys(locales);

const Layout = ({ children }) => {
  const { site: { siteMetadata, buildTime } } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        buildTime(fromNow: false, formatString: "YYYY-MM-D HH:mm (z)")
        siteMetadata {
          title
        }
      }
    }
  `);

  const { t } = useTranslation();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFF' }}>
      <CssBaseline />
      <Header siteTitle={siteMetadata.title} />
      <div>
        <main>{children}</main>

        <footer style={{ paddingTop: 10 }}>
          {t('Last build')} {buildTime}
          <br />
          <Location>
            {({ location: { pathname } }) => (
              languageIds.map(language => (
                <span key={language}>
                  <Link to={adaptPathname(pathname, language)}>{language}</Link>
                  {' '}
                </span>
              ))
            )}
          </Location>
        </footer>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
