import React, { useContext, useEffect } from 'react';
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
    margin: '1rem auto ',
    width: '75%',
    direction: 'rtl',
  },
});

const ProductTable = () => {
  const classes = useStyles();
  const productContext = useContext(ProductContext);
  const history = useHistory();
  useEffect(() => {
    productContext.getAllProducts();
    if (productContext.error) {
      toast.error(
        productContext.error.msg || productContext.error.errors[0].msg
      );
    }
    //eslint-disable-next-line
  }, [productContext.products, productContext.error]);
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
            productContext.products.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align='right'>{row.name}</StyledTableCell>
                <StyledTableCell align='right'>{row.price}</StyledTableCell>
                <StyledTableCell align='right'>{row.category}</StyledTableCell>
                <StyledTableCell align='right'>
                  <EditIcon
                    style={{ cursor: 'pointer' }}
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
                      productContext.deleteProduct(row._id);
                    }}
                  />
                  <InfoIcon
                    style={{
                      marginRight: '.5rem',
                      color: 'blue',
                      cursor: 'pointer',
                    }}
                    onClick={() => history.push(`/detail/${row._id}`)}
                  />
                  <CommentIcon
                    style={{
                      marginRight: '.5rem',
                      color: 'green',
                      cursor: 'pointer',
                    }}
                    onClick={() => history.push(`/product/${row._id}/comments`)}
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

export default ProductTable;
