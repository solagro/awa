
/**
 * Get the percentile value of given array of numbers
 *
 * @param {number[]} values An array of the values to group
 * @param {number} [percentile=50] A percentile
 * @returns {number} Percentile value
 */
export const getQuantile = (values, percentile = 50) => {
  const sortedValues = [...values].sort((a, b) => (a - b));
  const index = percentile / 100.0 * (values.length - 1);

  if (Math.floor(index) === index) {
    return sortedValues[index];
  }

  const i = Math.floor(index);
  const fraction = index - i;
  return sortedValues[i] + (sortedValues[i + 1] - sortedValues[i]) * fraction;
};

/**
 * Get the percentile values of given array of numbers
 *
 * @param {number[]} values An array of the values to group
 * @param {number[]} [percentile=50] An array of percentiles
 * @returns {number[]} Array of percentile values
 */
export const getQuantiles =  (values, percentile = []) =>
  percentile.map(percent => getQuantile(values, percent));

export const getMedian = values =>
  getQuantiles(values, 50);

export const getQuartiles = values =>
  getQuantiles(values, [25, 50, 75]);

export const getDeciles = values =>
  getQuantiles(values, [10, 20, 30, 40, 50, 60, 70, 80, 90]);

export const getCentiles = values =>
  getQuantiles(values, [...Array(99)].map((v, i) => i + 1));

/**
 * Get the group owning a number, given an array of percentiles
 *
 * @param {number} value
 * @param {number[]} [quantiles=[]]
 * @returns {number} The who's ownging the value
 */
export const getQuantileGroup = (value, quantiles = []) => {
  if (Number.isNaN(value)) {
    return null;
  }

  if (value >= [...quantiles].pop()) {
    return quantiles.length + 1;
  }

  return quantiles.findIndex(qt => (value < qt)) + 1;
};

export default {
  getQuantile,
  getQuantiles,
  getQuantileGroup,

  getMedian,
  getQuartiles,
  getDeciles,
  getCentiles,
};
