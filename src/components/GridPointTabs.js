import React from 'react';
import { useTranslation } from 'react-i18next';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Link from './Link';
import withModalContext from '../hoc/withModalRoutingContext';

const links = [
  {
    path: 'yield-compilation',
    id: 'yieldCompilation',
    label: 'Yield Compilation',
  },
  {
    path: 'climate-observations',
    id: 'climateObservations',
    label: 'Climate Observations',
  },
  {
    path: 'climate-projections',
    id: 'climateProjections',
    label: 'Climate Projections',
  },
];

const CustomAppBar = withStyles(theme => ({
  colorPrimary: {
    backgroundColor: 'none',
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(3),
  },
}))(props => <AppBar {...props} />);

const CustomTabs = withStyles(theme => ({
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

const CustomTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    height: theme.spacing(12),
  },
  selected: {},
}))(props => <Tab {...props} />);

const GridPointTabs = ({ sourceType, gridCode, modalProps: { modal, closeTo } }) => {
  const { t } = useTranslation();

  return (
    <CustomAppBar position="static">
      <CustomTabs value={sourceType}>
        {links.map(({ id, path, label }) => (
          <CustomTab
            key={id}
            label={t(label)} // i18next-extract-disable-line
            value={id}
            component={Link}
            to={`/map/${gridCode}/${path}`}
            state={{ modal, closeTo }}
          />
        ))}
      </CustomTabs>
    </CustomAppBar>
  );
};

export default withModalContext(GridPointTabs);
