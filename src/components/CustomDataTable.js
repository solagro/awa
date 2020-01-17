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

const CustomDataTable = ({ data = [], quartiles = false, deciles = false }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const headers = data.reduce((acc, curr) => ([...new Set([...acc, ...Object.keys(curr)])]), []);
  const dataByColumn = byColumn(data);

  return (
    <div className={classes.root}>
      <Table size="small" className="percentiles">
        <TableHead>
          <TableRow>
            {headers.map(header =>
              // i18next-extract-disable-next-line
              <TableCell key={header} className={classes.tableHeader}>{t(header)}</TableCell>)}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map(line => (
            <TableRow key={line.year} hover>
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
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomDataTable;
