import React, { useContext, useEffect } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CategoryItem from '../components/CategoryItem';
import ProductContext from '../context/products/ProductContext';

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

  const productContext = useContext(ProductContext);

  useEffect(() => {
    productContext.getProductByCategory(match.params.category);
    //eslint-disable-next-line
  }, [match.params.category]);

  return (
    <Box className={classes.root}>
      <Typography className={classes.text} variant='h3'>
        {match.params.category}
      </Typography>
      <Grid direction='row-reverse' container spacing={3}>
        {productContext.products.length > 0 ? (
          productContext.products.map((product) => {
            return <CategoryItem key={product._id} product={product} />;
          })
        ) : (
          <Typography className={classes.notFound} variant='h3'>
            محصولی وجود ندارد
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Category;
