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
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import Fab from '@material-ui/core/Fab';

import Header from './Header';
import './Layout.css';

import locales from '../locales';
import adaptPathname from '../lib/adaptPathname';

const languageIds = Object.keys(locales);

const drawerWidth = 80;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    marginTop: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

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

  const classes = useStyles();
  const { t, i18n } = useTranslation();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFF' }} className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        {['/', '/quizz', '/map', '/adaptations'].map(path => (
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            key={path}
            to={`/${i18n.language}${path}`}
            component={Link}
          >
            <EmojiNatureIcon />
          </Fab>
        ))}
      </Drawer>

      <div className={classes.content}>
        <Header siteTitle={siteMetadata.title} />
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
