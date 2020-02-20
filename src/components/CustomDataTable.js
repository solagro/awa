import React from 'react';
import { useTranslation } from 'react-i18next';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import { getQuantileGroup } from '../lib/math';
import { byColumn, toNumber } from '../lib/dataTable';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    overflow: 'auto',
    fontSize: '.8em',
  },
  tableHeader: {
    textAlign: 'center',
    padding: '0.25em',
    lineHeight: 1.2,
  },
  tableCell: {
    textAlign: 'center',
  },
  computedCell: {
    fontWeight: 'bold',
  },

  'quartile-1': { background: '#dea8a8' },
  'quartile-2': { background: '#dac5a0' },
  'quartile-3': { background: '#c6d799' },
  'quartile-4': { background: '#97d492' },
});

const ComputedRow = ({
  headers = [],
  dataByColumn = {},
  method = 'average',
  formatter = v => v,
  className,
  ...props
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <TableRow {...props}>
      <TableCell
        className={clsx(
          className,
          classes.computedCell,
          classes.tableCell,
        )}
      >
        {t(method)}
      </TableCell>
      {headers.map(header => (
        <TableCell
          key={header}
          className={clsx(
            className,
            classes.computedCell,
            classes.tableCell,
          )}
        >
          {formatter(dataByColumn[header][method])}
        </TableCell>
      ))}
    </TableRow>
  );
};

const CustomDataTable = ({
  data = [],
  quartiles = false,
  deciles = false,
  min = false,
  max = false,
  average = false,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const headers = data
    .reduce((acc, curr) => ([...new Set([...acc, ...Object.keys(curr)])]), [])
    .filter(header => header !== 'year');

  const dataByColumn = byColumn(data);

  return (
    <div className={classes.root}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('year')}</TableCell>
            {headers.map(header =>
              // i18next-extract-disable-next-line
              <TableCell key={header} className={classes.tableHeader}>{t(header)}</TableCell>)}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map(line => (
            <TableRow key={line.year} hover>
              <TableCell className={classes.tableHeader}>{line.year}</TableCell>
              {headers.map(header => {
                const value = toNumber(line[header]);
                const quartileGroup = getQuantileGroup(value, dataByColumn[header].quartiles);
                const decileGroup = getQuantileGroup(value, dataByColumn[header].deciles);
                return (
                  <TableCell
                    key={header}
                    className={clsx({
                      [classes.tableCell]: true,
                      [classes[`quartile-${quartileGroup}`]]: quartiles,
                      [classes[`decile-${decileGroup}`]]: deciles,
                    })}
                  >
                    {line[header]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}

          {min && (
            <ComputedRow
              hover
              headers={headers}
              dataByColumn={dataByColumn}
              className={classes.tableCell}
              method="min"
            />
          )}

          {max && (
            <ComputedRow
              hover
              headers={headers}
              dataByColumn={dataByColumn}
              className={classes.tableCell}
              method="max"
            />
          )}

          {average && (
            <ComputedRow
              hover
              headers={headers}
              dataByColumn={dataByColumn}
              className={classes.tableCell}
              method="average"
              formatter={value => value.toFixed(2)}
            />
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomDataTable;
