import React, { useContext } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

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
    margin: 'auto',
    boxShadow: '.1rem .1rem .1rem rgba(0,0,0,.5)',
    [theme.breakpoints.down('sm')]: {
      width: '75%',
    },
  },
  image: {
    width: '100%',
    height: '15rem',
    [theme.breakpoints.down('sm')]: {
      height: '14rem',
      width: '50%',
    },
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

  return (
    <Fragment>
      {productContext.loading ? (
        <Loader />
      ) : (
        productContext.discountedProducts.length > 0 && (
          <Box
            style={{ padding: '1rem 0', margin: '2rem 0', textAlign: 'center' }}
          >
            <Fragment>
              <Typography className={classes.text} variant='h4'>
                محصولات دارای تخفیف
              </Typography>
              <OwlCarousel
                style={{ textAlign: 'right' }}
                dots={true}
                nav={true}
                responsive={{
                  0: {
                    items: 1,
                  },
                  700: {
                    items: 2,
                  },
                  1024: {
                    items: 3,
                  },
                }}
                margin={15}
                className='owl-theme'
              >
                {productContext.discountedProducts.map((product) => {
                  return (
                    <Card className={classes.card} key={product._id}>
                      <CardActionArea>
                        <CardMedia
                          component='img'
                          className={classes.image}
                          src={product.image}
                          onClick={async () => {
                            await productContext.productDetail(product._id);
                            productContext.setLoading();
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
                })}
              </OwlCarousel>
            </Fragment>
          </Box>
        )
      )}
    </Fragment>
  );
};

export default DiscountSlider;
