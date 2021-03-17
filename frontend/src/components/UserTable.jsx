import React from 'react';
import MyTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    margin: '6rem auto ',
    width: '75%',
    direction: 'rtl',
  },
  link: {
    display: 'inline-block',
    padding: '.2rem .5rem',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: 'black',
    cursor: 'pointer',
  },
});

const UserTable = ({ orders }) => {
  const classes = useStyles();
  return (
    <TableContainer>
      <MyTable className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='right'>ای دی</StyledTableCell>
            <StyledTableCell align='right'>تاریخ پرداخت</StyledTableCell>
            <StyledTableCell align='right'>تاریخ ارسال</StyledTableCell>
            <StyledTableCell align='right'>جزئیات</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell align='right'>{row._id}</StyledTableCell>
              <StyledTableCell align='right'>{row.payDate}</StyledTableCell>
              <StyledTableCell align='right'>{row.sentDate}</StyledTableCell>
              <StyledTableCell align='right'>
                <Link className={classes.link} to={`/orderDetail/${row._id}`}>
                  جزئیات
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </MyTable>
    </TableContainer>
  );
};

export default UserTable;
