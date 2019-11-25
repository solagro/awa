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

import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import './Layout.css';

const drawerWidth = 64;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    background: 'url("/images/awa-background.svg") center -10% / cover no-repeat',
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
    marginLeft: drawerWidth,
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
  const tableOfContent = [
    { label: t('Home page'), path: '/' },
    { label: t('Quiz'), path: '/quizz' },
    { label: t('Observations'), path: '/map' },
    { label: t('Adaptations'), path: '/adaptations' },
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
        {tableOfContent.map(({ label, path }) => (
          <Tooltip key={label} title={label} placement="right">
            <Fab
              color="primary"
              aria-label="add"
              className={classes.fab}
              key={path}
              to={`/${i18n.language}${path}`}
              component={Link}
              size="small"
            >
              <EmojiNatureIcon />
            </Fab>
          </Tooltip>
        ))}
      </Drawer>

      <Grid item className={classes.content} xs={12} md={9} xl={8}>
        <Header
          siteTitle={siteMetadata.title}
          parentSite="https://agriadapt.eu/"
          logo="/images/agriAdapt-logo.svg"
        />
        <main>{children}</main>

        <footer style={{ paddingTop: 10 }}>
          {t('Last build')} {buildTime}
          <br />
        </footer>
      </Grid>
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
