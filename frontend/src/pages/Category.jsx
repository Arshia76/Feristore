import React, { useContext, useEffect } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CategoryItem from '../components/CategoryItem';
import ProductContext from '../context/products/ProductContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2rem 5rem',
    backgroundColor: '#CAEDDF',
    marginTop: '3rem',
  },
  text: {
    color: theme.palette.text.secondary,
    textAlign: 'right',
    marginBottom: '1rem',
  },
}));

const Category = ({ match }) => {
  const classes = useStyles();

  const productContext = useContext(ProductContext);

  useEffect(() => {
    productContext.getProductByCategory(match.params.category);
  }, []);

  return (
    <Box className={classes.root}>
      <Typography className={classes.text} variant='h3'>
        {match.params.category}
      </Typography>
      <Grid direction='row-reverse' container spacing={3}>
        {productContext.products.map((product) => {
          return <CategoryItem key={product._id} product={product} />;
        })}
      </Grid>
    </Box>
  );
};

export default Category;
