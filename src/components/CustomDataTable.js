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

const CustomDataTable = ({
  data = [],
  renderCell = ({ key, value }) => <TableCell key={key}>{value}</TableCell>,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const headers = data.reduce((acc, curr) => ([...new Set([...acc, ...Object.keys(curr)])]), []);

  return (
    <div className={classes.root}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.map(header => <TableCell key={header}>{t(header)}</TableCell>)}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map(line => (
            <TableRow key={line.year} hover>
              {headers.map(header => renderCell({ key: header, value: line[header] }))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomDataTable;
