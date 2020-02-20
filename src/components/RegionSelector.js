import React from 'react';
import { useTranslation } from 'react-i18next';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const RegionSelector = ({ regions, ...props }) => {
  const { t } = useTranslation();
  return (
    <FormControl>
      <Select
        variant="outlined"
        labelId="regionSelect"
        {...props}
      >
        {regions.map(({ value, enabled }) => (
          <MenuItem key={value} value={value} disabled={!enabled}>
            {t(value)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RegionSelector;
