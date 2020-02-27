import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql, useStaticQuery } from 'gatsby';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

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

  const { catalog } = useStaticQuery(graphql`
    query {
      catalog: adaptationsJson {
        impacts: sustainability_impact {
          id
          value
        }
      }
    }
  `);

  const impacts = catalog.impacts.reduce((store, { id, value }) => ({ ...store, [id]: value }), {});

  return (
    <List dense>
      {sustainabilityComponents.map(sustainabilityComponent => (
        <ListItem key={sustainabilityComponent}>
          <Tooltip
            title={t(impacts[measure[sustainabilityComponent]])}
            placement="left"
            arrow
          >
            <ListItemIcon>
              <img
                src={`/images/sustainability/impact-${measure[sustainabilityComponent]}.png`}
                style={{ width: '2em', margin: 0 }}
                alt=""
              />
            </ListItemIcon>
          </Tooltip>
          <Tooltip title={t(`${sustainabilityComponent}-explanation`)}>
            <ListItemText>
              {t(sustainabilityComponent)}
            </ListItemText>
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
};

export default SustainabilityComponents;
