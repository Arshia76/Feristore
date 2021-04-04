import React, { useContext } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Box,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import ReactStars from 'react-stars';
import ProductContext from '../context/products/ProductContext';
import CartContext from '../context/cart/CartContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem 0',
  },
  card: {
    direction: 'rtl',
  },
  image: {
    height: '15rem',
    [theme.breakpoints.down('sm')]: {
      height: '10rem',
    },
  },

  button: {
    fontSize: '1.2rem',
  },

  CardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  outerBox: {
    display: 'flex',
    alignItems: 'center',
  },

  innerBox: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1rem',
  },

  innerText: {
    marginLeft: '.3rem',
  },

  price: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '.5rem',
  },
}));

const CategoryItem = ({ product }) => {
  const classes = useStyles();
  const productContext = useContext(ProductContext);
  const cartContext = useContext(CartContext);
  const history = useHistory();
  return (
    <Grid className={classes.root} item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component='img'
            className={classes.image}
            image={`https://feristore.herokuapp.com/${product.image}`}
            title='Contemplative Reptile'
          />
          <CardContent className={classes.CardContent}>
            <Typography gutterBottom variant='h5' component='h2'>
              {product.name}
            </Typography>
            <Box className={classes.outerBox}>
              <ReactStars
                half={false}
                edit={false}
                value={product.rating}
                color2={'#ffd700'}
                count={5}
                size={24}
              />
              <Box className={classes.innerBox}>
                <Typography className={classes.innerText}>
                  {product.numOfReviews}
                </Typography>
                <Typography>نظر</Typography>
              </Box>
            </Box>
            <Box className={classes.price}>
              <Typography style={{ marginLeft: '.3rem' }}>
                {product.price}
              </Typography>
              <Typography>تومان</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={async () => {
              await productContext.productDetail(product._id);
              productContext.setLoading();
              history.push(`/detail/${product._id}`);
            }}
            className={classes.button}
            size='small'
            color='primary'
          >
            جزئیات
          </Button>
          <Button
            onClick={() => {
              cartContext.addCart(product, 1);
              history.push('/cart');
            }}
            className={classes.button}
            size='small'
            color='primary'
          >
            افزودن به سبد
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CategoryItem;
