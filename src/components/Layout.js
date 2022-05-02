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
import CookieNotice from './CookieNotice';

const useStyles = makeStyles(theme => ({
  '@global': {
    '.customModal': {
      position: 'absolute',
      top: 40,
      bottom: 40,
      left: '50%',
      right: 'auto',
      width: ({ width }) => width,
      transform: 'translateX(-50%)',
      border: '1px solid rgb(204, 204, 204)',
      background: 'white',
      borderRadius: 4,
      outline: 'none',
      display: 'flex',
    },
  },
  root: {
    display: 'flex',
    alignContent: 'center',
    background: 'url("/images/awa-background.svg") center -10% / cover no-repeat',
    minHeight: '100vh',
    [theme.breakpoints.down('md')]: {
      marginTop: '64px',
    },
  },
  maximize: {
    flex: '1',
    height: '100vh',
  },
  modal: {
    position: 'relative',
    flex: '1 1 auto',
    display: 'flex',
    maxWidth: '100%',
  },
  modalScroll: {
    padding: 20,
    flex: '1 1 auto',
    maxWidth: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    zIndex: 0,
  },
  modal__button: {
    position: 'absolute',
    right: theme.spacing(1.5),
    top: theme.spacing(1),
    background: 'rgba(220, 220, 220, .2)',
    borderRadius: '50%',
    zIndex: 1,
  },
  content: {
    flexGrow: 1,
    marginLeft: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
    },
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
  modalWidth = '75%',
  ...rest
}) => {
  const { site: { siteMetadata } } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const classes = useStyles({ width: modalWidth });
  const { t } = useTranslation();

  if (modal) {
    return (
      <main className={classes.modal}>
        <Link to={closeTo} className={classes.modal__button}>
          <IconButton size="small" aria-label={t('close')}>
            <CloseIcon />
          </IconButton>
        </Link>
        <div className={classes.modalScroll}>
          {children}
        </div>
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
        <Footer />
      )}
      <CookieNotice />
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withModalContext(Layout);
