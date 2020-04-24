import React from 'react';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  inlineWrapper: {
    display: 'inline-flex',
  },
  icon: {
    margin: 0,
    width: '4em',
  },
  label: {
    marginLeft: theme.spacing(1),
  },
}));

const condition = enable => WrappedComponent => props => (
  enable
    ? <WrappedComponent {...props} />
    : <>{props.children}</> // eslint-disable-line react/destructuring-assignment
);

const CustomIcon = React.forwardRef(({
  src,
  label,
  className,
  showLabel = false,
  showTooltip = false,
  tooltipProps = {},
  inline = false,
  iconProps = {},
  labelProps = {},
  ...props
}, ref) => {
  const classes = useStyles();

  const Wrapper = React.useMemo(() => condition(showTooltip)(Tooltip), [showTooltip]);

  return (
    <Box
      className={clsx(
        classes.wrapper,
        className,
        { [classes.inlineWrapper]: inline },
      )}
      ref={ref}
      {...props}
    >
      <Wrapper title={label} {...tooltipProps}>
        <img
          src={src}
          alt={label}
          className={classes.icon}
          {...iconProps}
        />
      </Wrapper>
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
});

export default CustomIcon;
