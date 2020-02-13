import React from 'react';
import { useTranslation } from 'react-i18next';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTheme } from '@material-ui/core/styles';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import Link from './Link';
import { getImplementationColorProps } from '../lib/adaptationsHelpers';

const AdaptationMeasureList = ({
  measures = [],
  linkPrefix = '',
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  if (!measures.length) {
    return (
      <List>
        <ListItem
          dense
        >
          <ListItemText primary={t('No measure to show')} />
        </ListItem>
      </List>
    );
  }

  return (
    <List>
      {measures.map(({ slug, name, region, term }) => (
        <ListItem
          dense
          button
          component={Link}
          key={slug}
          to={`${linkPrefix}/${region}/${slug}`}
          state={{ modal: true }}
        >
          <ListItemIcon>
            <FiberManualRecordIcon fontSize="small" {...getImplementationColorProps(theme)(term)} />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
};

export default AdaptationMeasureList;
