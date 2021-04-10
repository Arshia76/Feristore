import React, { useContext, Fragment, useState } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import PopularProductItem from './PopularProductItem';
import ProductContext from '../context/products/ProductContext';
import Loader from './Loader/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '5rem',
  },
  text: {
    color: theme.palette.text.secondary,
    textAlign: 'right',
    marginBottom: '1rem',
  },
}));

const PopularProducts = () => {
  const productContext = useContext(ProductContext);
  const [page, setPage] = useState(1);

  const classes = useStyles();
  return (
    <Fragment>
      {productContext.loading ? (
        <Loader />
      ) : (
        productContext.specialProducts.results &&
        productContext.specialProducts.results.length > 0 && (
          <Box className={classes.root}>
            <Fragment>
              <Typography className={classes.text} variant='h4'>
                محصولات ویژه
              </Typography>
              <Grid
                direction='row-reverse'
                container
                justify='center'
                align='center'
                spacing={3}
              >
                {productContext.specialProducts.results &&
                  productContext.specialProducts.results.map((product) => {
                    return (
                      <PopularProductItem key={product._id} product={product} />
                    );
                  })}
              </Grid>
              {productContext.specialProducts.pages > 1 && (
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
                    count={productContext.specialProducts.pages}
                    page={page}
                    onChange={(e, value) => {
                      productContext.setLoading();
                      setPage(value);
                      productContext.getSpecialProducts(6, value);
                      window.scrollTo(0, 0);
                    }}
                  />
                </Box>
              )}
            </Fragment>
          </Box>
        )
      )}
    </Fragment>
  );
};

export default PopularProducts;
