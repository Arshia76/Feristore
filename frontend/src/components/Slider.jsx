import React, { useContext, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import SliderItem from './SliderItem';
import ProductContext from '../context/products/ProductContext';
const useStyles = makeStyles((theme) => ({
  carousel: {
    marginTop: '1rem',
  },
  text: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
  },
}));

const Slider = () => {
  const classes = useStyles();
  const productContext = useContext(ProductContext);

  useEffect(() => {
    productContext.getNewProducts();
  }, []);
  return (
    <Box style={{ padding: '1rem 0' }}>
      <Typography className={classes.text} variant='h3'>
        محصولات جدید
      </Typography>
      <Carousel
        navButtonsAlwaysVisible
        indicators={false}
        className={classes.carousel}
      >
        {productContext.products.map((product) => {
          return (
            product.carousel === true && (
              <SliderItem
                key={product._id}
                image={product.image}
                name={product.name}
              />
            )
          );
        })}
      </Carousel>
    </Box>
  );
};

export default Slider;
