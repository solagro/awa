import React from 'react';
import { useTranslation } from 'react-i18next';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const sustainabilityComponents = [
  'ghg_emissions',
  'air_quality',
  'soil',
  'water',
  'biodiversity',
  'animal_welfare',
  'economic',
  'social',
  'technical_feasibility',
];

const SustainabilityComponents = ({ measure }) => {
  const { t } = useTranslation();

  return (
    <List dense>
      {sustainabilityComponents.map(sustainabilityComponent => (
        <ListItem key={sustainabilityComponent}>
          <ListItemIcon>
            <img
              src={`/images/sustainability/impact-${measure[sustainabilityComponent]}.png`}
              style={{ width: '2em', margin: 0 }}
              alt=""
            />
          </ListItemIcon>
          <ListItemText>
            {t(sustainabilityComponent)}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default SustainabilityComponents;
