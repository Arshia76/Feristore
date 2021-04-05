import React, { useContext, useEffect, useState } from 'react';
import MyTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import CommentIcon from '@material-ui/icons/Comment';
import ProductContext from '../../context/products/ProductContext';
import ReviewContext from '../../context/review/ReviewContext';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      fontSize: 10,
      textAlign: 'center',
    },
  },
  body: {
    fontSize: 14,
    [theme.breakpoints.down('md')]: {
      fontSize: 10,
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
    margin: '1rem auto ',
    width: '75%',
    direction: 'rtl',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },
}));

const ProductTable = () => {
  const classes = useStyles();
  const productContext = useContext(ProductContext);
  const reviewContext = useContext(ReviewContext);
  const history = useHistory();
  const [page, setPage] = useState(1);
  useEffect(() => {
    productContext.getAllProducts(10, page);

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (productContext.error) {
      toast.error(
        productContext.error.msg || productContext.error.errors[0].msg
      );
    }
  }, [productContext.error]);
  return (
    <TableContainer>
      <MyTable className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='right'>نام محصول</StyledTableCell>
            <StyledTableCell align='right'>قیمت محصول</StyledTableCell>
            <StyledTableCell align='right'>دسته بندی محصول</StyledTableCell>
            <StyledTableCell align='right'>عملیات</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productContext.loading ? (
            <Loader />
          ) : (
            productContext.products.results &&
            productContext.products.results.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align='right'>{row.name}</StyledTableCell>
                <StyledTableCell align='right'>{row.price}</StyledTableCell>
                <StyledTableCell align='right'>{row.category}</StyledTableCell>
                <StyledTableCell align='right'>
                  <EditIcon
                    style={{ cursor: 'pointer', marginRight: '.5rem' }}
                    onClick={() =>
                      history.push({
                        pathname: '/admin/product/manage',
                        state: {
                          name: row.name,
                          price: row.price,
                          description: row.description,
                          countInStock: row.countInStock,
                          productImage: row.productImage,
                          carousel: row.carousel,
                          special: row.special,
                          category: row.category,
                          id: row._id,
                          discount: row.discount,
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
                      productContext.setLoading();
                      productContext.deleteProduct(row._id);
                      productContext.getAllProducts(10, page);
                    }}
                  />
                  <InfoIcon
                    style={{
                      marginRight: '.5rem',
                      color: 'blue',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      productContext.setLoading();
                      history.push(`/detail/${row._id}`);
                    }}
                  />
                  <CommentIcon
                    style={{
                      marginRight: '.5rem',
                      color: 'green',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      reviewContext.setLoading();
                      history.push(`/product/${row._id}/comments`);
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </MyTable>
      {productContext.products.pages > 1 && (
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
            count={productContext.products.pages}
            page={page}
            onChange={(e, value) => {
              productContext.setLoading();
              setPage(value);
              productContext.getAllProducts(1, value);
              window.scrollTo(0, 0);
            }}
          />
        </Box>
      )}
    </TableContainer>
  );
};

export default ProductTable;
