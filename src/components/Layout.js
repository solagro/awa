/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router';

import Header from './Header';
import './Layout.css';

import locales from '../locales/all';
import adaptPathname from '../lib/adaptPathname';

const languageIds = Object.keys(locales);

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFF' }}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0px 1.0875rem 1.45rem',
          paddingTop: 100,
        }}
      >
        <main>{children}</main>
        <footer style={{ paddingTop: 10 }}>
          © {new Date().getFullYear()}, Built with

          <a href="https://www.gatsbyjs.org">Gatsby</a>

          <div>
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
          </div>
        </footer>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
