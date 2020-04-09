import React from 'react';
import { useTranslation } from 'react-i18next';


import Typography from '@material-ui/core/Typography';

import { getDomainOfDataByKey } from 'recharts/lib/util/ChartUtils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getNiceTickValues } from 'recharts-scale';

import {
  Area,
  Bar,
  ComposedChart,
  Legend,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
} from 'recharts';

const isLive = typeof window !== 'undefined';

const getChartDomain = (data, keys) => Object.values(keys.reduce((store, key) => {
  const [min, max] = getDomainOfDataByKey(data, key, 'number');
  return {
    min: Math.min(store.min, min),
    max: Math.max(store.max, max),
  };
}, { min: +Infinity, max: -Infinity }));

/**
 * For specified `keys`, get Math.min or Math.max of keys in object[tip]
 */
const getCustomTip = (tip = 'min') => object => (keys = []) => {
  /**
   * `tip` should be 'min' OR 'max'
   */
  if (!['min', 'max'].includes(tip)) {
    return undefined;
  }

  /**
   * `object` must be an Object having tip property
   */
  if (typeof object !== 'object' || !object[tip]) {
    return undefined;
  }

  /**
   * `keys` should have at least one key
   */
  if (!keys.length) {
    return undefined;
  }

  /**
   * At least one key should match between `object[tip]` & `keys`
   */
  if (!Object.keys(object[tip]).some(key => keys.includes(key))) {
    return undefined;
  }

  const initValue = { min: Infinity, max: -Infinity };

  return keys.reduce((store, key) => (
    typeof object[tip][key] !== 'undefined'
      ? Math[tip](store, object[tip][key])
      : store
  ), initValue[tip]);
};

const getCustomMin = getCustomTip('min');
const getCustomMax = getCustomTip('max');

const getAxisProps = (fields, dataKeys, data) => {
  const customMin = getCustomMin(fields)(dataKeys);
  const customMax = getCustomMax(fields)(dataKeys);

  const stepCount = fields.steps
    ? +fields.steps[dataKeys.find(key => fields.steps[key])]
    : 11;

  const allowDecimalStep = fields.decimal
    ? Boolean(+fields.decimal[dataKeys.find(key => fields.decimal[key])])
    : false;

  const [dataMin, dataMax] = getChartDomain(data, dataKeys);

  const customDomain = [
    typeof customMin === 'number' ? customMin : Math.min(0, dataMin),
    typeof customMax === 'number' ? customMax : dataMax,
  ];

  const ticks = getNiceTickValues(
    customDomain,
    stepCount,
    allowDecimalStep,
  );

  const domain = [
    ticks[0],
    ticks[ticks.length - 1],
  ];

  return { ticks, domain };
};

export const DefaultComposedChart = ({
  children,
  tooltipProps = {},
  gridProps = {},
  xAxisProps = {},
  yAxisProps = {},
  valueFormatter = v => v,
  ...props
}) => {
  const { t } = useTranslation();

  if (!isLive) {
    return null;
  }

  return (
    <ComposedChart
      width={900}
      height={400}
      margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
      style={{ margin: '0 auto' }}
      {...props}
    >
      {/* i18next-extract-disable-next-line */}
      <Tooltip formatter={(value, name) => ([valueFormatter(value), t(name)])} {...tooltipProps} />
      {/* i18next-extract-disable-next-line */}
      <Legend formatter={value => t(value)} />

      <CartesianGrid {...gridProps} />
      <XAxis dataKey="year" type="number" scale="time" domain={['dataMin', 'dataMax']} {...xAxisProps} />
      <YAxis
        tickFormatter={valueFormatter}
        interval={0}
        {...yAxisProps}
      />


      {children}
    </ComposedChart>
  );
};

export const CustomStackedBarChart = ({
  data,
  headers = [],
  dataKeys = headers,
  color = '#8a2542',
  colors = [color],
  ...props
}) => (
  <DefaultComposedChart
    data={data}
    xAxisProps={{ domain: [dataMin => (dataMin - 1), dataMax => (dataMax + 1)] }}
    {...props}
  >
    {dataKeys.map((key, idx) => {
      const chartColor = colors[idx % colors.length];

      return (
        <Bar
          key={key}
          stackId="a"
          dataKey={key}
          fill={chartColor}
        />
      );
    })}
  </DefaultComposedChart>
);

export const CustomLineChart = ({
  data,
  headers = [],
  dataKeys = headers,
  color = '#8a2542',
  colors = [color],
  type = 'monotone',
  types = [type],
  yAxisProps = {},
  fields = {},
  ...props
}) => {
  const { ticks, domain } = getAxisProps(fields, dataKeys, data);

  return (
    <DefaultComposedChart data={data} yAxisProps={{ domain, ticks, ...yAxisProps }} {...props}>
      {dataKeys.map((key, idx) => {
        const chartColor = colors[idx % colors.length];
        const chartType = types[idx % types.length];

        const yearsWithoutData = data.filter(({ [key]: dataKey }) =>
          (typeof dataKey === 'undefined')).map(({ year }) => year);

        return [
          ...yearsWithoutData.map(year => <ReferenceArea x1={year} x2={year + 1} />),
          (
            <Line
              key={key}
              type={chartType}
              dataKey={key}
              stroke={chartColor}
              strokeWidth={2}
            />
          ),
        ];
      })}
    </DefaultComposedChart>
  );
};

export const CustomAreaChart = ({
  data,
  headers = [],
  dataKeys = headers,
  color = '#8a2542',
  colors = [color],
  type = 'monotone',
  types = [type],
  yAxisProps = {},
  fields = {},
  ...props
}) => {
  // const chartDomain = getChartDomain(data, dataKeys);
  // const ticksDomain = [Math.min(0, chartDomain[0]), Math.max(0, chartDomain[1])];
  // const ticks = getNiceTickValues(ticksDomain, 11, false);

  const { ticks, domain } = getAxisProps(fields, dataKeys, data);

  return (
    <DefaultComposedChart data={data} yAxisProps={{ ticks, domain, ...yAxisProps }} {...props}>
      {dataKeys.map((key, idx) => {
        const chartColor = colors[idx % colors.length];
        const chartType = types[idx % types.length];

        return (
          <Area
            key={key}
            type={chartType}
            dataKey={key}
            fill={chartColor}
            stroke={chartColor}
          />
        );
      })}
    </DefaultComposedChart>
  );
};

export const ChartTitle = ({ main, sub }) => {
  let subtitle;

  if (typeof sub === 'string') {
    subtitle = sub;
  }

  if (sub instanceof Array) {
    subtitle = Array.from(new Set(sub)).join(' ');
  }

  if (typeof sub === 'object') {
    const { year, ...props } = sub;
    subtitle = Array.from(new Set(Object.values(props))).join(' ');
  }

  return (
    <>
      <Typography variant="subtitle1">{main}</Typography>
      {subtitle && (
        <Typography
          variant="subtitle2"
          style={{ fontSize: '0.85em', textAlign: 'center', opacity: 0.5 }}
        >
          {subtitle}
        </Typography>
      )}
    </>
  );
};

export const ChartText = ({
  content,
  contents = [content],
  ...props
}) => {
  if (!contents[0]) {
    return null;
  }

  return contents.map(text => (
    <Typography
      key={text.substr(0, 128)}
      variant="body2"
      dangerouslySetInnerHTML={{ __html: text }}
      paragraph
      {...props}
    />
  ));
};
