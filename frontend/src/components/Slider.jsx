import React, { useContext } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import SliderItem from './SliderItem';
import ProductContext from '../context/products/ProductContext';
import { Fragment } from 'react';
import Loader from './Loader/Loader';
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

  return (
    <Fragment>
      {productContext.loading ? (
        <Loader />
      ) : (
        productContext.newProducts.length > 0 && (
          <Box style={{ padding: '1rem 0' }}>
            <Fragment>
              <Typography className={classes.text} variant='h4'>
                محصولات جدید
              </Typography>
              <Carousel
                navButtonsAlwaysVisible
                indicators={false}
                className={classes.carousel}
              >
                {productContext.newProducts.map((product) => {
                  return (
                    <SliderItem
                      key={product._id}
                      id={product._id}
                      image={product.image}
                      name={product.name}
                    />
                  );
                })}
              </Carousel>
            </Fragment>
          </Box>
        )
      )}
    </Fragment>
  );
};

export default Slider;
