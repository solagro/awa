import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/styles';

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
  },
  drawerPaper: {
    width: drawerWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    marginTop: theme.spacing(3),
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
  );
};

export default MainNav;
