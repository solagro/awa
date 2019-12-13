/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Header from './Header';
import MainNav from './MainNav';
import Footer from './Footer';

import withModalContext from '../hoc/withModalRoutingContext';

import './Layout.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    background: 'url("/images/awa-background.svg") center -10% / cover no-repeat',
    minHeight: '100vh',
  },
  maximize: {
    flex: '1',
    height: '100vh',
  },
  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  modal__button: {
    position: 'absolute',
    right: theme.spacing(1),
  },
  content: {
    flexGrow: 1,
    marginLeft: theme.spacing(8),
  },
  content__paper: {
    padding: theme.spacing(3),
    minHeight: '100vh',
  },
}));

const Layout = ({
  header = false,
  footer = false,
  paper = true,
  navigation = true,
  maximize = false,
  children,
  className,
  modalProps: { modal, closeTo },
  ...rest
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
  const { t } = useTranslation();

  if (modal) {
    return (
      <main className={classes.modal}>
        <Link to={closeTo}>
          <IconButton size="small" aria-label={t('close')} className={classes.modal__button}>
            <CloseIcon />
          </IconButton>
        </Link>
        {children}
      </main>
    );
  }

  return (
    <Grid
      container
      className={clsx(classes.root, className)}
      justify="center"
      alignItems="center"
      alignContent="center"
      {...rest}
    >
      <CssBaseline />

      {navigation && (
        <MainNav />
      )}

      {header && (
        <Header
          siteTitle={siteMetadata.title}
          parentSite="https://agriadapt.eu/"
          logo="/images/logos/agriAdapt-logo.svg"
        />
      )}

      {!maximize && (
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
      )}

      {maximize && (
        <main className={classes.maximize}>
          {children}
        </main>
      )}


      {footer && (
        <Footer buildTime={buildTime} />
      )}
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withModalContext(Layout);
