import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const CustomAppBar = withStyles(theme => ({
  colorPrimary: {
    backgroundColor: 'none',
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(3),
  },
}))(props => <AppBar {...props} />);

export const CustomTabs = withStyles(theme => ({
  flexContainer: {
    justifyContent: 'space-around',
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: theme.spacing(1),
    '& > div': {
      maxWidth: theme.spacing(9),
      width: '100%',
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))(props => <Tabs {...props} centered TabIndicatorProps={{ children: <div /> }} />);

export const CustomTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    height: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      flexShrink: '1',
    },
  },
  selected: {},
}))(props => <Tab {...props} />);


export const SecondaryAppBar = withStyles(theme => ({
  colorPrimary: {
    backgroundColor: 'transparent',
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(3),
    boxShadow: 'none',
    color: theme.palette.text.primary,
  },
}))(props => <AppBar {...props} />);

export const SecondaryTabs = withStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  flexContainer: {
    marginBottom: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& > a': {
        maxWidth: '100%',
      },
    },
  },
  indicator: {
    height: 3,
  },
}))(props => <Tabs {...props} centered />);

export const SecondaryTab = withStyles(theme => ({
  root: {
    fontSize: '.8rem',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '&:hover': {
      fontWeight: 700,
      opacity: 1,
    },
    '&$selected': {
      color: '#000',
      opacity: 1,
    },
    '&:focus': {
      color: '#000',
      opacity: 1,
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);
