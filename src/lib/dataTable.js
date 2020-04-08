import {
  getQuartiles,
  getDeciles,
} from './math';

export const toNumber = str => (str ? Number(str.replace(/,/, '.')) : undefined);

export const byColumn = (data = []) => {
  const dataByColumn = {};

  data.forEach(dataLine => {
    Object.entries(dataLine).forEach(([header, value]) => {
      if (!dataByColumn[header]) {
        dataByColumn[header] = {
          values: [],
        };
      }

      dataByColumn[header].values.push(toNumber(value));
    });
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const header in dataByColumn) {
    if (header && !['id', 'year'].includes(header)) {
      const { values } = dataByColumn[header];
      const cleanValues = values.filter(value =>
        (typeof value !== 'undefined' && !Number.isNaN(value)));

      dataByColumn[header].quartiles = getQuartiles(values);
      dataByColumn[header].deciles = getDeciles(values);

      if (cleanValues.length) {
        dataByColumn[header].min = Math.min(...cleanValues);
        dataByColumn[header].max = Math.max(...cleanValues);
        dataByColumn[header].average = cleanValues
          .reduce((acc, curr) => (acc + curr)) / cleanValues.length;
      }
    }
  }

  return dataByColumn;
};

export const columnsWithNumericValues = columns => Object.entries(columns)
  .reduce((acc, [columnHeader, value]) => ({
    ...acc,
    [columnHeader]: toNumber(value),
  }), {});

export const parseData = json => {
  const rawData = JSON.parse(json);
  const validYear = rawData.filter(({ year }) => (!!year && toNumber(year)));
  const numericData = validYear.map(({ year, id, ...columns }) => ({
    year: toNumber(year),
    ...columnsWithNumericValues(columns),
  }));

  const [firstItem] = numericData;
  const headers = Object.keys(firstItem).filter(key => (key !== 'year'));
  const meta = rawData.find(({ year }) => !year) || {};

  const fields = rawData
    .filter(({ year }) => !toNumber(year))
    .map(({ year, ...rest }) => ({
      ...rest,
      name: year,
    }));

  return {
    data: numericData,
    headers,
    meta,
    fields,
  };
};
