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

import './customDataTable.css';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    overflow: 'auto',
  },
  tableHeader: {
    textAlign: 'center',
  },
  tableCell: {
    textAlign: 'center',
  },
});

const ComputedRow = ({
  headers = [],
  dataByColumn = {},
  method = 'average',
  formatter = v => v,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell {...props}>{t(method)}</TableCell>
      {headers.map(header => (
        <TableCell {...props}>{formatter(dataByColumn[header][method])}</TableCell>
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
      <Table size="small" className="percentiles">
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
              {headers.map(header => (
                <TableCell
                  key={header}
                  className={clsx({
                    [classes.tableCell]: true,
                    [`quartile-${getQuantileGroup(toNumber(line[header]), dataByColumn[header].quartiles)}`]: quartiles,
                    [`decile-${getQuantileGroup(toNumber(line[header]), dataByColumn[header].deciles)}`]: deciles,
                  })}
                >
                  {line[header]}
                </TableCell>
              ))}
            </TableRow>
          ))}

          {min && (
            <ComputedRow
              headers={headers}
              dataByColumn={dataByColumn}
              className={classes.tableCell}
              method="min"
            />
          )}

          {max && (
            <ComputedRow
              headers={headers}
              dataByColumn={dataByColumn}
              className={classes.tableCell}
              method="max"
            />
          )}

          {average && (
            <ComputedRow
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
