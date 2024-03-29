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
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(-3),
      marginRight: theme.spacing(-3),
      width: `calc(100% + ${theme.spacing(6)}px)`,
    },
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
      lineHeight: 1.4,
      flexShrink: '1',
      height: theme.spacing(8),
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
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(0),
    },
  },
}))(props => <AppBar {...props} />);

export const SecondaryTabs = withStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  flexContainer: {
    marginBottom: theme.spacing(0),
  },
  indicator: {
    height: 3,
  },

  [theme.breakpoints.down('md')]: {
    root: {
      marginBottom: theme.spacing(3),
    },
    flexContainer: {
      flexWrap: 'wrap',
    },
    indicator: {
      display: 'none',
    },
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

  [theme.breakpoints.down('md')]: {
    root: {
      minWidth: 0,
      minHeight: 0,
      padding: 0,
      borderBottom: '3px solid transparent',
      margin: theme.spacing(0.5, 1),
      lineHeight: 1.4,
    },
    selected: {
      borderBottomColor: theme.palette.secondary.main,
    },
  },
}))(props => <Tab disableRipple {...props} />);
