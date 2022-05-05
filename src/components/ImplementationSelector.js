import React from 'react';
import { useTranslation } from 'react-i18next';

import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { getImplementationColorProps } from '../lib/adaptationsHelpers';

const useStyles = makeStyles(theme => ({
  checkboxGroup: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0.5),
      marginLeft: 0,
    },
  },
  checkboxFilter: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
}));

const ImplementationSelector = ({
  implementations,
  availableImplementations,
  selectedImplementations,
  onChange,
  ...props
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  return (
    <FormGroup {...props}>
      {implementations.map(id => {
        const enabled = availableImplementations.has(id);
        const checked = enabled && selectedImplementations.has(id);

        return (
          <FormControlLabel
            className={classes.checkboxGroup}
            control={(
              <Checkbox
                className={classes.checkboxFilter}
                value={id}
                onChange={() => onChange(id)}
                checked={checked}
                disabled={!enabled}
                size="small"
                {...getImplementationColorProps(theme)(enabled ? id : 'disabled')}
              />
            )}
            label={t(id)}
            key={id}
          />
        );
      })}
    </FormGroup>
  );
};

export default ImplementationSelector;
