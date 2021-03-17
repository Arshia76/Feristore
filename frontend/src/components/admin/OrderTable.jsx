import React, { useContext, useEffect } from 'react';
import MyTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import OrderContext from '../../context/orders/OrderContext';
import Loader from '../Loader/Loader';

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
    margin: '5rem auto ',
    width: '75%',
    direction: 'rtl',
  },
  link: {
    padding: '.3rem .5rem',
    textDecoration: 'none',
    color: 'white',
    display: 'inline-block',
    backgroundColor: 'black',
    margin: '0 .5rem',
    cursor: 'pointer',
  },
});

const OrderTable = () => {
  const classes = useStyles();
  const orderContext = useContext(OrderContext);

  useEffect(() => {
    orderContext.getAllOrders();
    //eslint-disable-next-line
  }, [orderContext.order, orderContext.loading]);
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
            orderContext.orders &&
            orderContext.orders.map((row) => (
              <StyledTableRow key={row !== undefined && row._id}>
                <StyledTableCell align='right'>
                  {row !== undefined && row._id}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {row !== undefined && row.payDate}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {row !== undefined && row.sentDate}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <Link
                    className={classes.link}
                    to={`/orderDetail/${row !== undefined && row._id}`}
                  >
                    جزئیات
                  </Link>
                  {row !== undefined && row.sentDate !== 'ارسال نشده' ? null : (
                    <p
                      className={classes.link}
                      onClick={() => {
                        orderContext.setLoading();
                        orderContext.updateSentDate(
                          row !== undefined && row._id
                        );
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
    </TableContainer>
  );
};

export default OrderTable;
