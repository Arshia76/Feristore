import React, { useContext, useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CategoryItem from '../components/CategoryItem';
import ProductContext from '../context/products/ProductContext';
import { Pagination } from '@material-ui/lab';
import { Fragment } from 'react';
import Loader from '../components/Loader/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2rem 5rem',
    marginTop: '3rem',
  },
  text: {
    color: theme.palette.text.secondary,
    textAlign: 'right',
    marginBottom: '1rem',
  },

  notFound: {
    color: theme.palette.text.secondary,
    margin: '5rem auto',
  },
}));

const Category = ({ match }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const productContext = useContext(ProductContext);

  useEffect(() => {
    productContext.getProductByCategory(match.params.category, 10, page);
    //eslint-disable-next-line
  }, [match.params.category]);

  return (
    <Fragment>
      {productContext.loading ? (
        <Loader />
      ) : (
        <Box className={classes.root}>
          <Typography className={classes.text} variant='h3'>
            {match.params.category}
          </Typography>
          <Grid direction='row-reverse' container spacing={3}>
            {productContext.products.results &&
            productContext.products.results.length > 0 ? (
              productContext.products.results.map((product) => {
                return <CategoryItem key={product._id} product={product} />;
              })
            ) : (
              <Typography className={classes.notFound} variant='h3'>
                محصولی وجود ندارد
              </Typography>
            )}
          </Grid>
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
                  setPage(value);
                  productContext.getProductByCategory(
                    match.params.category,
                    10,
                    value
                  );
                }}
              />
            </Box>
          )}
        </Box>
      )}
    </Fragment>
  );
};

export default Category;
