import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import AdaptationsPicto from './AdaptationsPicto';
import HomepagePicto from './HomepagePicto';
import Link from './Link';
import ObservationsPicto from './ObservationsPicto';
import QuizPicto from './QuizPicto';

const drawerWidth = 64;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '64px',
      flexDirection: 'row',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
  },
  fab: {
    marginTop: theme.spacing(3),
    color: theme.palette.primary.main,
    backgroundColor: '#fff',
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(0),
    },
  },
  fab__active: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    boxShadow: '4px 4px 4px #e0e0e0',
  },
}));

const MainNav = () => {
  const { t } = useTranslation();
  const classes = useStyles();


  const tableOfContent = [
    {
      label: t('Home page'),
      path: '/',
      picto: <HomepagePicto />,
      isHomePage: true,
    },
    {
      label: t('Quiz'),
      path: '/quiz',
      picto: <QuizPicto />,
    },
    {
      label: t('Observations'),
      path: '/map',
      picto: <ObservationsPicto />,
    },
    {
      label: t('Adaptations'),
      path: '/adaptations',
      picto: <AdaptationsPicto />,
    },
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
      anchor="left"
    >
      {tableOfContent.map(({ label, path, picto, isHomePage }) => (
        <Tooltip key={label} title={label} placement="right">
          <Fab
            aria-label="add"
            className={classes.fab}
            key={path}
            to={`/${path}`}
            component={Link}
            size="medium"
            activeClassName={classes.fab__active}
            partiallyActive={!isHomePage}
          >
            {picto}
          </Fab>
        </Tooltip>
      ))}
    </Drawer>
  );
};

export default MainNav;
