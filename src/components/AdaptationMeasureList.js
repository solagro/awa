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

const useStyles = makeStyles({
  button: {
    lineHeight: 1.2,
  },
  icon: {
    marginRight: 0,
  },
});

const AdaptationMeasureList = ({
  measures = [],
  linkPrefix = '',
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <List>
      {!measures.length && (
        <ListItem dense>
          <ListItemText primary={t('No measure to show')} />
        </ListItem>
      )}

      {measures.map(({ slug, name, region, term }) => (
        <ListItem dense disableGutters key={slug}>
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
            {name}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default AdaptationMeasureList;
