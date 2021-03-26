import React, { useContext, useEffect } from 'react';
import MyTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import UserContext from '../../context/users/UserContext';
import DeleteIcon from '@material-ui/icons/Delete';
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

const useStyles = makeStyles((theme) => ({
  table: {
    margin: '6rem auto ',
    width: '75%',
    direction: 'rtl',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },
}));

const CustomerTable = () => {
  const classes = useStyles();
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext.getUsers();
    //eslint-disable-next-line
  }, [userContext.users]);
  return (
    <TableContainer>
      <MyTable className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='right'>نام مشتری</StyledTableCell>
            <StyledTableCell align='right'>ایمیل مشتری</StyledTableCell>
            <StyledTableCell align='right'>عملیات</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userContext.loading ? (
            <Loader />
          ) : (
            userContext.users.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align='right'>{row.username}</StyledTableCell>
                <StyledTableCell align='right'>{row.email}</StyledTableCell>
                <StyledTableCell align='right'>
                  <DeleteIcon
                    style={{
                      marginRight: '.5rem',
                      color: 'red',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      userContext.deleteUser(row._id);
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </MyTable>
    </TableContainer>
  );
};

export default CustomerTable;
