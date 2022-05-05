import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import Link from './Link';
import { getImplementationColorProps } from '../lib/adaptationsHelpers';

const useStyles = makeStyles(theme => ({
  listElement: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
  button: {
    lineHeight: 1.2,
  },
  icon: {
    marginRight: 0,
  },
}));

const AdaptationMeasureList = ({
  measures = [],
  linkPrefix = '',
}) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const classes = useStyles();

  return (
    <List>
      {!measures.length && (
        <ListItem dense>
          <ListItemText primary={t('No measure to show')} />
        </ListItem>
      )}

      {measures.map(({ slug, name, region, term, altName, altLanguage }) => (
        <ListItem dense disableGutters key={`${name}${altName}`} className={classes.listElement}>
          <Button
            className={classes.button}
            component={Link}
            variant="outlined"
            size="small"
            classes={{ startIcon: classes.icon }}
            startIcon={<FiberManualRecordIcon {...getImplementationColorProps(theme)(term)} />}
            to={`${linkPrefix}/${region}/${slug}`}
            state={{ modal: true }}
          >
            {altLanguage === i18n.language ? altName : name}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default AdaptationMeasureList;
