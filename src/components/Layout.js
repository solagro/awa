/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Header from './Header';
import MainNav from './MainNav';
import Footer from './Footer';

import './Layout.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    background: 'url("/images/awa-background.svg") center -10% / cover no-repeat',
    minHeight: '100vh',
  },
  content: {
    flexGrow: 1,
  },
  content__paper: {
    padding: theme.spacing(3),
    height: '100vh',
  },
}));

const Layout = ({
  header = false,
  footer = false,
  paper = true,
  navigation = true,
  children,
}) => {
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

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <CssBaseline />

      {navigation && (
        <MainNav />
      )}

      {header && (
        <Header
          siteTitle={siteMetadata.title}
          parentSite="https://agriadapt.eu/"
          logo="/images/agriAdapt-logo.svg"
        />
      )}

      <Grid item className={classes.content} xs={12} md={9} xl={8}>
        {!paper && (
          <main>{children}</main>
        )}

        {paper && (
          <Paper elevation={4} square className={classes.content__paper}>
            <main>{children}</main>
          </Paper>
        )}
      </Grid>

      {footer && (
        <Footer buildTime={buildTime} />
      )}
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
