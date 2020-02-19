import React from 'react';
import { useTranslation } from 'react-i18next';

import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useTheme } from '@material-ui/core/styles';

import { getImplementationColorProps } from '../lib/adaptationsHelpers';

const ImplementationSelector = ({
  implementations,
  availableImplementations,
  selectedImplementations,
  onChange,
  ...props
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <FormGroup {...props}>
      {implementations.map(id => {
        const enabled = availableImplementations.has(id);
        const checked = enabled && selectedImplementations.has(id);

        return (
          <FormControlLabel
            control={(
              <Checkbox
                value={id}
                onChange={() => onChange(id)}
                checked={checked}
                disabled={!enabled}
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
