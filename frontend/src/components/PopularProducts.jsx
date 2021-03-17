import React, { useContext, Fragment } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
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

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {productContext.specialProducts.length > 0 && (
        <Fragment>
          <Typography className={classes.text} variant='h3'>
            محصولات ویژه
          </Typography>
          <Grid direction='row-reverse' container spacing={3}>
            {productContext.loading ? (
              <Loader />
            ) : (
              productContext.specialProducts.map((product) => {
                return (
                  <PopularProductItem key={product._id} product={product} />
                );
              })
            )}
          </Grid>
        </Fragment>
      )}
    </Box>
  );
};

export default PopularProducts;
