/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';

import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Header from './Header';
import Footer from './Footer';
import HomepagePicto from './HomepagePicto';
import QuizPicto from './QuizPicto';
import ObservationsPicto from './ObservationsPicto';
import AdaptationsPicto from './AdaptationsPicto';
import Link from './Link';
import './Layout.css';

const drawerWidth = 64;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    background: 'url("/images/awa-background.svg") center -10% / cover no-repeat',
    minHeight: '100vh',
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
  fab__picto: {
    maxWidth: '70%',
  },
  content: {
    flexGrow: 1,
  },
  content__paper: {
    padding: theme.spacing(3),
    height: '100vh',
  },
}));

const Layout = ({ children, isHomepage }) => {
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
  const { t } = useTranslation();
  const tableOfContent = [
    { label: t('Home page'), path: '/', picto: <HomepagePicto /> },
    { label: t('Quiz'), path: '/quiz', picto: <QuizPicto /> },
    { label: t('Observations'), path: '/map', picto: <ObservationsPicto /> },
    { label: t('Adaptations'), path: '/adaptations', picto: <AdaptationsPicto /> },
  ];
  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        {tableOfContent.map(({ label, path, picto }) => (
          <Tooltip key={label} title={label} placement="right">
            <Fab
              color="primary"
              aria-label="add"
              className={classes.fab}
              key={path}
              to={`/${path}`}
              component={Link}
              size="medium"
            >
              {picto}
            </Fab>
          </Tooltip>
        ))}
      </Drawer>

      {isHomepage && (
        <Header
          siteTitle={siteMetadata.title}
          parentSite="https://agriadapt.eu/"
          logo="/images/agriAdapt-logo.svg"
        />
      )}

      <Grid item className={classes.content} xs={12} md={9} xl={8}>
        {isHomepage && <main>{children}</main>}
        {!isHomepage && (
          <Paper elevation={4} square className={classes.content__paper}>
            <main>{children}</main>
          </Paper>
        )}
      </Grid>

      {isHomepage && <Footer buildTime={buildTime} />}
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
