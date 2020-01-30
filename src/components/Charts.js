import React from 'react';
import { useTranslation } from 'react-i18next';

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
}) => (
  <DefaultComposedChart data={data} {...props}>
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

export const CustomAreaChart = ({
  data,
  headers = [],
  dataKeys = headers,
  color = '#8a2542',
  colors = [color],
  type = 'monotone',
  types = [type],
  ...props
}) => (
  <DefaultComposedChart data={data} {...props}>
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
