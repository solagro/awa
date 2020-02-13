export const filterBy = key => value => ({ [key]: property }) => (property === value);

export const singleKey = key => ({ [key]: value }) => value;

export const getImplementationColorProps = theme => implementation => {
  const colors = {
    'short-term': { style: { color: theme.palette.primary.main } },
    'mid-term': { style: { color: theme.palette.secondary.main } },
    'long-term': { style: { color: theme.palette.success.main } },
  };
  return colors[implementation];
};
