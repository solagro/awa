import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { getNiceTickValues } from 'recharts-scale';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 14;
const DEFAULT_STEPS = 11;

const TicksSimulator = () => {
  const [ticks, setTicks] = React.useState(
    getNiceTickValues([DEFAULT_MIN, DEFAULT_MAX], DEFAULT_STEPS, false),
  );

  const handleChange = ({ currentTarget }) => {
    const {
      customMin,
      customMax,
      steps,
      decimal,
    } = Object.fromEntries(new FormData(currentTarget));

    setTicks(getNiceTickValues(
      [+customMin, +customMax],
      (+steps > 2 && +steps < 100) ? +steps : DEFAULT_STEPS,
      typeof decimal !== 'undefined',
    ));
  };

  return (
    <>
      <form onChange={handleChange}>
        <TextField variant="outlined" type="text" name="customMin" label="Chart min value" defaultValue={DEFAULT_MIN} />{' '}
        <TextField variant="outlined" type="text" name="customMax" label="Chart max value" defaultValue={DEFAULT_MAX} />{' '}
        <TextField variant="outlined" type="text" name="steps" label="Step count" defaultValue={DEFAULT_STEPS} />
        <br />
        <FormControlLabel control={<Switch type="checkbox" name="decimal" />} label="Allow decimal steps?" />
      </form>

      <Grid container spacing={3} justify="center">
        {ticks.map(item => (
          <Grid item key={item} style={{ textAlign: 'center' }}>
            {item}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TicksSimulator;
