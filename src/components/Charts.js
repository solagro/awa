import React from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@material-ui/core/Typography';

import {
  Bar,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const stdProps1 = {
  width: 900,
  height: 400,
  margin: { top: 8, right: 16, left: 0, bottom: 8 },
};

export const DefaultComposedChart = ({
  children,
  tooltipProps = {},
  gridProps = {},
  ...props
}) => (
  <ComposedChart {...stdProps1} {...props}>
    <CartesianGrid {...gridProps} />
    <Tooltip {...tooltipProps} />

    <XAxis dataKey="year" type="number" scale="time" domain={['dataMin', 'dataMax']} />
    <YAxis />

    {children}
  </ComposedChart>
);

export const CustomStackedBarChart = ({
  data,
  headers = [],
  dataKeys = headers,
  color = '#8a2542',
  colors = [color],
}) => {
  const { t } = useTranslation();

  return (
    <DefaultComposedChart
      data={data}
      style={{ margin: '0 auto' }}
      tooltipProps={{
        // i18next-extract-disable-next-line
        formatter: (value, name) => ([value, t(name)]),
      }}
    >
      {dataKeys.map((key, idx) => {
        const chartColor = colors[idx % colors.length];

        return <Bar stackId="a" key={key} dataKey={key} fill={chartColor} />;
      })}
    </DefaultComposedChart>
  );
};

export const CustomLineChart = ({
  data,
  headers = [],
  dataKeys = headers,
  color = '#8a2542',
  colors = [color],
  type = 'monotone',
  types = [type],
}) => {
  const { t } = useTranslation();

  return (
    <DefaultComposedChart
      data={data}
      style={{ margin: '0 auto' }}
      tooltipProps={{
        // i18next-extract-disable-next-line
        formatter: (value, name) => ([value, t(name)]),
      }}
    >
      {dataKeys.map((key, idx) => {
        const chartColor = colors[idx % colors.length];
        const chartType = types[idx % types.length];

        return <Line type={chartType} key={key} dataKey={key} stroke={chartColor} />;
      })}
    </DefaultComposedChart>
  );
};

export const ChartLegend = ({
  meta = [],
  colors = [],
}) => (
  <ul style={{ listStyleType: 'none' }}>
    {Object.entries(meta).map(([key, value], index) => {
      if (!value) return null;
      const color = colors[index] || '#8a2542';
      return (
        <Typography
          key={key}
          variant="caption"
          component="li"
          style={{ textAlign: 'center', color }}
        >
          {key} {value}
        </Typography>
      );
    })}
  </ul>
);
