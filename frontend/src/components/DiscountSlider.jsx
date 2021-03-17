import React, { useContext } from 'react';
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
import { Fragment } from 'react';
import Loader from './Loader/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem 0',
  },
  card: {
    direction: 'rtl',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '20rem',
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
    marginBottom: '1rem',
  },
}));

const DiscountSlider = () => {
  const classes = useStyles();
  const history = useHistory();
  const productContext = useContext(ProductContext);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          arrows: true,
          dots: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box style={{ padding: '1rem 0', margin: '2rem 0', textAlign: 'center' }}>
      {productContext.discountedProducts.length > 0 && (
        <Fragment>
          <Typography className={classes.text} variant='h3'>
            محصولات دارای تخفیف
          </Typography>
          <Slider style={{ textAlign: 'right' }} {...settings}>
            {productContext.loading ? (
              <Loader />
            ) : (
              productContext.discountedProducts.map((product) => {
                return (
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
                        <Typography gutterBottom variant='h5' component='h6'>
                          {product.name}
                        </Typography>
                        <Typography gutterBottom variant='h6' component='h6'>
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
                );
              })
            )}
          </Slider>
        </Fragment>
      )}
    </Box>
  );
};

export default DiscountSlider;
