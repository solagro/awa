import React from 'react';
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

const CustomIcon = ({
  src,
  label,
  showLabel,
  className,
  iconProps = {},
  labelProps = {},
  ...props
}) => {
  const classes = useStyles();

  return (
    <Box
      className={clsx(classes.wrapper, className)}
      {...props}
    >
      <img
        src={src}
        alt={label}
        className={classes.icon}
        {...iconProps}
      />
      {showLabel && (
        <Box
          className={classes.label}
          {...labelProps}
        >
          {label}
        </Box>
      )}
    </Box>
  );
};

export default CustomIcon;
