import React, { useContext, useEffect } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PopularProductItem from './PopularProductItem';
import ProductContext from '../context/products/ProductContext';

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

  useEffect(() => {
    productContext.getSpecialProducts();
  }, []);
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography className={classes.text} variant='h3'>
        محصولات ویژه
      </Typography>
      <Grid direction='row-reverse' container spacing={3}>
        {productContext.products.map((product) => {
          return (
            product.special === true && (
              <PopularProductItem key={product._id} product={product} />
            )
          );
        })}
      </Grid>
    </Box>
  );
};

export default PopularProducts;
