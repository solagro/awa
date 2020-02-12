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
} from 'recharts';

const getChartDomain = (data, keys) => Object.values(keys.reduce((store, key) => {
  const [min, max] = getDomainOfDataByKey(data, key, 'number');
  return {
    min: Math.min(store.min, min),
    max: Math.max(store.max, max),
  };
}, { min: +Infinity, max: -Infinity }));

export const DefaultComposedChart = ({
  children,
  tooltipProps = {},
  gridProps = {},
  xAxisProps = {},
  yAxisProps = {},
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <ComposedChart
      width={900}
      height={400}
      margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
      style={{ margin: '0 auto' }}
      {...props}
    >
      {/* i18next-extract-disable-next-line */}
      <Tooltip formatter={(value, name) => ([value, t(name)])} {...tooltipProps} />
      {/* i18next-extract-disable-next-line */}
      <Legend formatter={value => t(value)} />

      <CartesianGrid {...gridProps} />
      <XAxis dataKey="year" type="number" scale="time" domain={['dataMin', 'dataMax']} {...xAxisProps} />
      <YAxis {...yAxisProps} />


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
  ...props
}) => {
  const chartDomain = getChartDomain(data, dataKeys);
  const ticksDomain = [Math.min(0, chartDomain[0]), chartDomain[1]];
  const ticks = getNiceTickValues(ticksDomain, 11, false);

  return (
    <DefaultComposedChart data={data} yAxisProps={{ ticks }} {...props}>
      {dataKeys.map((key, idx) => {
        const chartColor = colors[idx % colors.length];
        const chartType = types[idx % types.length];

        return (
          <Line
            key={key}
            type={chartType}
            dataKey={key}
            stroke={chartColor}
            strokeWidth={2}
          />
        );
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
  ...props
}) => {
  const chartDomain = getChartDomain(data, dataKeys);
  const ticksDomain = [Math.min(0, chartDomain[0]), Math.max(0, chartDomain[1])];
  const ticks = getNiceTickValues(ticksDomain, 11, false);

  return (
    <DefaultComposedChart data={data} yAxisProps={{ ticks }} {...props}>
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
