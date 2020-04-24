import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import NavigationIcon from '@material-ui/icons/Navigation';
import RestoreIcon from '@material-ui/icons/Restore';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import doRedirect from '../hoc/doRedirect';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  item: {
    maxWidth: 500,
    marginBottom: theme.spacing(1),
  },
}));

const StyleguidePage = () => {
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <Layout>
      <Typography variant="h1" gutterBottom>h1. Title</Typography>
      <Typography variant="h2" gutterBottom>h2. Title</Typography>
      <Typography variant="h3" gutterBottom>h3. Title</Typography>
      <Typography variant="h4" gutterBottom>h4. Title</Typography>
      <Typography variant="h5" gutterBottom>h5. Title</Typography>
      <Typography variant="h6" gutterBottom>h6. Title</Typography>

      <div className={classes.root}>
        <AppBar className={classes.item} position="relative" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {t('Default App Bar')}
            </Typography>
          </Toolbar>
        </AppBar>
        <AppBar className={classes.item} position="relative" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {t('Primary App Bar')}
            </Typography>
          </Toolbar>
        </AppBar>
        <AppBar className={classes.item} position="relative" color="secondary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {t('Secondary App Bar')}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <div className={classes.root}>
        <Badge className={classes.margin} badgeContent={4} color="primary">
          <MailIcon />
        </Badge>
        <Badge className={classes.margin} badgeContent={10} color="secondary">
          <MailIcon />
        </Badge>
        <Badge className={classes.margin} badgeContent={42} color="error">
          <MailIcon />
        </Badge>
      </div>

      <div className={classes.root}>
        <BottomNavigation
          className={classes.item}
          showLabels
          value={0}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </div>

      <>
        <div className={classes.root}>
          <Button className={classes.button}>Default</Button>
          <Button color="primary" className={classes.button}>
            Primary
          </Button>
          <Button color="secondary" className={classes.button}>
            Secondary
          </Button>
          <Button disabled className={classes.button}>
            Disabled
          </Button>
          <Button href="#text-buttons" className={classes.button}>
            Link
          </Button>
        </div>
        <div className={classes.root}>
          <Button className={classes.button} variant="outlined">Default</Button>
          <Button color="primary" className={classes.button} variant="outlined">
            Primary
          </Button>
          <Button color="secondary" className={classes.button} variant="outlined">
            Secondary
          </Button>
          <Button disabled className={classes.button} variant="outlined">
            Disabled
          </Button>
          <Button href="#text-buttons" className={classes.button} variant="outlined">
            Link
          </Button>
        </div>
        <div className={classes.root}>
          <Button className={classes.button} variant="contained">Default</Button>
          <Button color="primary" className={classes.button} variant="contained">
            Primary
          </Button>
          <Button color="secondary" className={classes.button} variant="contained">
            Secondary
          </Button>
          <Button disabled className={classes.button} variant="contained">
            Disabled
          </Button>
          <Button href="#text-buttons" className={classes.button} variant="contained">
            Link
          </Button>
        </div>
        <div className={classes.root}>
          <Fab color="primary" className={classes.button}>
            <AddIcon />
          </Fab>
          <Fab color="secondary" className={classes.button}>
            <DeleteIcon />
          </Fab>
          <Fab disabled className={classes.button}>
            <NavigationIcon />
          </Fab>
          <Fab href="#text-buttons" className={classes.button}>
            Link
          </Fab>
        </div>
      </>

    </Layout>
  );
};

export default doRedirect(StyleguidePage);
