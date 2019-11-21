const isInt = value => !Number.isNaN(Number.parseInt(value, 10));

const removePrefix = filterFn => (name = '', separator = '_') => {
  const [prefix, ...rest] = name.split(separator);
  if (filterFn(prefix)) {
    return rest.join(separator);
  }
  return name;
};

exports.removeNumberPrefix = removePrefix(isInt);
