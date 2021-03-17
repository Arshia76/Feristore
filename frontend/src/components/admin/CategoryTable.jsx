import React, { useEffect, useContext } from 'react';
import MyTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CategoryContext from '../../context/category/CategoryContext';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    margin: '2rem auto ',
    width: '75%',
    direction: 'rtl',
  },
});

const CategoryTable = () => {
  const classes = useStyles();
  const categoryContext = useContext(CategoryContext);
  const history = useHistory();

  useEffect(() => {
    categoryContext.getCategories();
    if (categoryContext.error) {
      toast.error(
        categoryContext.error.msg || categoryContext.error.errors[0].msg
      );
    }
    //eslint-disable-next-line
  }, [categoryContext.category, categoryContext.error]);
  return (
    <TableContainer>
      <MyTable className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>نام دسته بندی</StyledTableCell>
            <StyledTableCell align='center'>عملیات</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categoryContext.loading ? (
            <Loader />
          ) : (
            categoryContext.category.map((row) => (
              <StyledTableRow key={row.category}>
                <StyledTableCell align='center'>{row.category}</StyledTableCell>
                <StyledTableCell align='center'>
                  <EditIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      history.push({
                        pathname: '/admin/category/manage',
                        state: {
                          category: row,
                          type: 'بروز رسانی',
                        },
                      })
                    }
                  />
                  <DeleteIcon
                    style={{
                      marginRight: '.5rem',
                      color: 'red',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      categoryContext.deleteCategory(row._id);
                    }}
                  />
                  <InfoIcon
                    style={{
                      marginRight: '.5rem',
                      color: 'blue',
                      cursor: 'pointer',
                    }}
                    onClick={() => history.push(`/categories/${row.category}`)}
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

export default CategoryTable;
