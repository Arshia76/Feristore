import React, { useContext } from 'react';
import CartItem from '../components/CartItem';
import { Container, Box, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CartContext from '../context/cart/CartContext';

const useStyles = makeStyles({
  root: { padding: '1rem', display: 'grid', marginTop: '4rem' },
  firstBox: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
    padding: '1.5rem',
    boxShadow: '1rem 1rem 1rem #c0afdb',
    height: 'max-content',
    direction: 'rtl',
    position: 'sticky',
    top: '0',
  },

  innerBox: {
    display: 'flex',
    alignItems: 'center',

    '& > *': {
      marginLeft: '.5rem',
      marginTop: '.5rem',
      marginBottom: '.5rem',
    },
  },

  button: {
    color: 'white',
    backgroundColor: 'red',
    transition: 'all .4s linear',
    fontSize: '1.1rem',

    '&:hover': {
      color: 'red',
      backgroundColor: 'white',
    },
  },

  secondBox: {
    height: '80vh',
    padding: '1rem',
    overflowX: 'hidden',
    overflowY: 'auto',
    scrollbarColor: '#a4b0bd #d5d9df',
  },
});

const Cart = ({ history }) => {
  const classes = useStyles();
  const cartContext = useContext(CartContext);

  return (
    <Container className={classes.root}>
      <Grid spacing={2} container>
        <Grid item className={classes.secondBox} xs={12} sm={9} md={8}>
          {cartContext.cart.map((cart) => {
            return (
              <CartItem
                key={cart._id}
                name={cart.name}
                image={cart.image}
                price={cart.price}
                _id={cart._id}
                count={cart.count}
                description={cart.description}
                category={cart.category}
                reviews={cart.reviews}
                countInStock={cart.countInStock}
              />
            );
          })}
        </Grid>
        <Grid item xs={12} sm={3} md={3} className={classes.firstBox}>
          <Box className={classes.innerBox}>
            <Typography>تعداد محصولات :</Typography>
            <Typography>
              {cartContext.cart.reduce((tot, arr) => {
                return tot + arr.count;
              }, 0)}
            </Typography>
          </Box>
          <Box className={classes.innerBox}>
            <Typography>قیمت محصولات :</Typography>
            <Box className={classes.innerBox}>
              <Typography>
                {cartContext.cart.reduce((tot, arr) => {
                  return tot + arr.price * arr.count;
                }, 0)}
              </Typography>
              <Typography>تومان</Typography>
            </Box>
          </Box>
          <Button
            disabled={cartContext.cart.length === 0}
            className={classes.button}
            onClick={() => history.push('/orderInfo')}
          >
            پرداخت
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
