/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useTranslation } from 'react-i18next';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    overflow: 'auto',
  },
});

const CustomDataTable = ({ keys = [], years = [] }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('Year')}</TableCell>
            {keys.map(({ fieldValue: key }) =>
              <TableCell key={key}>{key}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {years.map(({ fieldValue: year, nodes }) => (
            <TableRow key={year} hover>
              <TableCell component="th" scope="row">{year}</TableCell>
              {nodes.map(({ value }, index) =>
                <TableCell key={index}>{value}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomDataTable;
