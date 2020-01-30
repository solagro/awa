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
      dataByColumn[header].quartiles = getQuartiles(dataByColumn[header].values);
      dataByColumn[header].deciles = getDeciles(dataByColumn[header].values);
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
  const validData = rawData.filter(({ year }) => year);
  const numericData = validData.map(({ year, id, ...columns }) => ({
    year: toNumber(year),
    ...columnsWithNumericValues(columns),
  }));

  const [firstItem] = numericData;
  const headers = Object.keys(firstItem).filter(key => (key !== 'year'));
  const meta = rawData.find(({ year }) => !year);
  return {
    data: numericData,
    headers,
    meta,
  };
};
