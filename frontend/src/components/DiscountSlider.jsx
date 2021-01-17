import React, { useContext, useEffect } from 'react';
import Slider from 'react-slick';
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ProductContext from '../context/products/ProductContext';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem 0',
  },
  card: {
    direction: 'rtl',
    height: '100%',
  },
  image: {
    height: '15rem',
    width: '100%',
  },

  CardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  price: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '.5rem',
  },
  text: {
    color: theme.palette.text.secondary,
    textAlign: 'right',
  },
}));

const DiscountSlider = () => {
  const classes = useStyles();
  const history = useHistory();
  const productContext = useContext(ProductContext);

  useEffect(() => {
    productContext.getDiscountProducts();
  }, [productContext.discountProducts]);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box style={{ padding: '1rem 0', margin: '2rem 0' }}>
      <Typography className={classes.text} variant='h3'>
        محصولات دارای تخفیف
      </Typography>
      <Slider style={{ textAlign: 'right' }} {...settings}>
        {productContext.products.map((product) => {
          return (
            product.isDiscount === true && (
              <Card className={classes.card} key={product._id}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    className={classes.image}
                    src={product.image}
                    onClick={async () => {
                      await productContext.productDetail(product._id);
                      history.push(`/detail/${product._id}`);
                    }}
                  />
                  <CardContent className={classes.CardContent}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {product.name}
                    </Typography>
                    <Typography gutterBottom variant='h6' component='h2'>
                      {`${product.discount}%`}
                    </Typography>

                    <Box className={classes.price}>
                      <Typography style={{ marginLeft: '.3rem' }}>
                        {product.price}
                      </Typography>
                      <Typography>تومان</Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          );
        })}
      </Slider>
    </Box>
  );
};

export default DiscountSlider;
