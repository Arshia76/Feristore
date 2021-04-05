import React, { useContext, useEffect, useState } from 'react';
import MyTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import OrderContext from '../../context/orders/OrderContext';
import Loader from '../Loader/Loader';
import { Box } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
      textAlign: 'center',
    },
  },
  body: {
    fontSize: 14,
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
      textAlign: 'center',
      margin: '.5rem 0 !important',
    },
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    margin: '5rem auto ',
    width: '75%',
    direction: 'rtl',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },

  link: {
    padding: '.3rem .5rem',
    textDecoration: 'none',
    color: 'white',
    display: 'inline-block',
    backgroundColor: 'black',
    margin: '.5rem .5rem',
    cursor: 'pointer',
    width: '3rem',
    textAlign: 'center',
  },
}));

const OrderTable = () => {
  const classes = useStyles();
  const orderContext = useContext(OrderContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    orderContext.getAllOrders(10, page);
    //eslint-disable-next-line
  }, []);

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
          {orderContext.loading ? (
            <Loader />
          ) : (
            orderContext.orders.results &&
            orderContext.orders.results.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell align='right'>{row._id}</StyledTableCell>
                <StyledTableCell align='right'>{row.payDate}</StyledTableCell>
                <StyledTableCell align='right'>{row.sentDate}</StyledTableCell>
                <StyledTableCell align='right'>
                  <Link className={classes.link} to={`/orderDetail/${row._id}`}>
                    جزئیات
                  </Link>
                  {row.sentDate !== 'ارسال نشده' ? null : (
                    <p
                      className={classes.link}
                      onClick={() => {
                        orderContext.setLoading();
                        orderContext.updateSentDate(row._id);
                        orderContext.getAllOrders(10, page);
                        window.scrollTo(0, 0);
                      }}
                    >
                      ارسال
                    </p>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </MyTable>
      {orderContext.orders.pages > 1 && (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            margin: '2rem 0',
          }}
        >
          <Pagination
            color='primary'
            size='large'
            variant='outlined'
            count={orderContext.orders.pages}
            page={page}
            onChange={(e, value) => {
              setPage(value);
              orderContext.setLoading();
              orderContext.getAllOrders(10, value);
            }}
          />
        </Box>
      )}
    </TableContainer>
  );
};

export default OrderTable;
