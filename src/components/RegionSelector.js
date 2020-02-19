import React from 'react';
import { useTranslation } from 'react-i18next';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const RegionSelector = ({ regions, ...props }) => {
  const { t } = useTranslation();
  return (
    <FormControl>
      <InputLabel id="regionSelect">{t('Region')}</InputLabel>
      <Select
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
