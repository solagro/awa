import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    margin: 0,
    width: '4em',
  },
  label: {
    marginLeft: theme.spacing(1),
  },
}));

const RiskRegion = ({
  region,
  label,
  showName = false,
  className,
  ...props
}) => {
  const { catalog } = useStaticQuery(graphql`
    {
      catalog: adaptationsJson {
        climate_risk_region {
          value
          id
        }
      }
    }
  `);

  const getRegionId = r => {
    const foundRegion = catalog.climate_risk_region.find(({ value }) => (value === r))
    return foundRegion ? foundRegion.id : 0;
  };

  const classes = useStyles();

  return (
    <Box
      className={clsx(classes.wrapper, className)}
      {...props}
    >
      <img
        src={`/images/regions/ZONE_${getRegionId(region)}.png`}
        alt={label}
        className={classes.icon}
      />
      {showName && (
        <Box className={classes.label}>
          {label}
        </Box>
      )}
    </Box>
  );
};

export default RiskRegion;
