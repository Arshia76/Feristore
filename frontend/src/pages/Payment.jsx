import React, { useState, useContext, Fragment, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OrderContext from '../context/orders/OrderContext';
import CartContext from '../context/cart/CartContext';

const useStyles = makeStyles({
  root: {
    marginTop: '5rem',
    padding: '2rem',
    width: '100%',
  },

  orderDetail: {
    border: '1px solid black',
  },

  orderDetailInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '.5rem',
  },

  orderPrice: {
    display: 'flex',
    alignItems: 'center',
  },

  btn: {
    width: '50%',
    margin: '1rem 0',
    fontSize: '18px',
    color: 'black',
    backgroundColor: 'white',
    transition: 'all .5s linear',

    '&:hover': {
      color: 'white',
      backgroundColor: 'black',
    },
  },

  Inner: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '.5rem',
  },

  orderItems: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
    overflowX: 'hidden',
    overflowY: 'auto',
  },

  img: {
    width: '6rem',
    height: '6rem',
    marginLeft: '1rem',
  },

  product: {
    display: 'flex',
    alignItems: 'center',
  },
});

const Payment = ({ history }) => {
  const classes = useStyles();
  const cartContext = useContext(CartContext);
  const [productPrice] = useState(() =>
    JSON.parse(localStorage.getItem('cart')).reduce(
      (tot, cur) => tot + cur.price * cur.count,
      0
    )
  );
  const [sendPrice] = useState(2000);
  const orderContext = useContext(OrderContext);

  const [state] = useState({
    name:
      localStorage.getItem('personInfo') !== null
        ? JSON.parse(localStorage.getItem('personInfo')).name
        : null,
    email:
      localStorage.getItem('personInfo') !== null
        ? JSON.parse(localStorage.getItem('personInfo')).email
        : null,
    phoneNumber:
      localStorage.getItem('personInfo') !== null
        ? parseInt(JSON.parse(localStorage.getItem('personInfo')).phoneNumber)
        : null,
    address:
      localStorage.getItem('personInfo') !== null
        ? JSON.parse(localStorage.getItem('personInfo')).address
        : null,
    postalCode:
      localStorage.getItem('personInfo') !== null
        ? parseInt(JSON.parse(localStorage.getItem('personInfo')).postalCode)
        : null,
    city:
      localStorage.getItem('personInfo') !== null
        ? JSON.parse(localStorage.getItem('personInfo')).city
        : null,
    orderItems: JSON.parse(localStorage.getItem('cart')).map((item) => {
      return {
        productName: item.name,
        productPrice: item.price,
        productCount: item.count,
        productImage: item.image,
      };
    }),
    payDate: 'پرداخت نشده',
    sentDate: 'ارسال نشده',
    totalPrice: productPrice + sendPrice,
    productPrice,
  });

  const createOrder = async (e) => {
    e.preventDefault();
    orderContext.setLoading();
    await orderContext.createOrder(JSON.stringify(state));
  };

  useEffect(() => {
    if (
      state.orderItems.length === 0 ||
      localStorage.getItem('personInfo') === null
    ) {
      history.push('/');
    }
    //eslint-disable-next-line
  }, [state.orderItems]);

  useEffect(() => {
    if (orderContext.order !== null) {
      cartContext.clearCart();
      history.push(`/orderDetail/${orderContext.order._id}`);
    }

    //eslint-disable-next-line
  }, [orderContext.order]);

  return (
    <Grid container className={classes.root} spacing={4}>
      <Fragment>
        <Grid direction='column' item xs={12} md={4}>
          <Box className={classes.orderDetail}>
            <Typography
              style={{ margin: '.5rem 0', textAlign: 'center' }}
              variant='h4'
            >
              اطلاعات پرداخت
            </Typography>
            <hr />
            <Box style={{ padding: '1rem', direction: 'rtl' }}>
              <Box className={classes.orderDetailInner}>
                <Typography>قیمت محصولات:</Typography>
                <Box className={classes.orderPrice}>
                  <Typography style={{ marginLeft: '.3rem' }}>
                    {productPrice}
                  </Typography>
                  <Typography>تومان</Typography>
                </Box>
              </Box>
              <Box className={classes.orderDetailInner}>
                <Typography>هزینه ارسال:</Typography>
                <Box className={classes.orderPrice}>
                  <Typography style={{ marginLeft: '.3rem' }}>
                    {sendPrice}
                  </Typography>
                  <Typography>تومان</Typography>
                </Box>
              </Box>
              <Box className={classes.orderDetailInner}>
                <Typography>قیمت کل:</Typography>
                <Box className={classes.orderPrice}>
                  <Typography style={{ marginLeft: '.3rem' }}>
                    {state.totalPrice}
                  </Typography>
                  <Typography>تومان</Typography>
                </Box>
              </Box>
            </Box>
            <hr />
            <Box style={{ width: '100%', textAlign: 'center' }}>
              <Button
                onClick={createOrder}
                className={classes.btn}
                variant='outlined'
              >
                ثبت سفارش
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          style={{ direction: 'rtl' }}
          direction='column'
          item
          xs={12}
          md={8}
        >
          <Typography variant='h4'>مشخصات</Typography>
          <Box className={classes.Inner}>
            <Typography variant='h6' style={{ marginLeft: '1rem' }}>
              نام:
            </Typography>
            <Typography variant='h6'>{state.name}</Typography>
          </Box>
          <Box className={classes.Inner}>
            <Typography variant='h6' style={{ marginLeft: '1rem' }}>
              ایمیل:
            </Typography>
            <Typography variant='h6'>{state.email}</Typography>
          </Box>
          <Box className={classes.Inner}>
            <Typography variant='h6' style={{ marginLeft: '1rem' }}>
              تلفن:
            </Typography>
            <Typography variant='h6'>{state.phoneNumber}</Typography>
          </Box>
          <Box className={classes.Inner}>
            <Typography
              variant='h6'
              style={{ marginLeft: '1rem', wordBreak: 'break-word' }}
            >
              آدرس:
            </Typography>
            <Typography variant='h6'>{state.address}</Typography>
          </Box>
          <Box className={classes.Inner}>
            <Typography
              variant='h6'
              style={{ marginLeft: '1rem', wordBreak: 'break-word' }}
            >
              شهر:
            </Typography>
            <Typography variant='h6'>{state.city}</Typography>
          </Box>
          <Box className={classes.Inner}>
            <Typography variant='h6' style={{ marginLeft: '1rem' }}>
              کد پستی:
            </Typography>
            <Typography variant='h6'>{state.postalCode}</Typography>
          </Box>
          <hr style={{ margin: '2rem 0' }} />
          <Box>
            <Typography variant='h4'>محصولات</Typography>
            {state.orderItems.map((item) => {
              return (
                <Box className={classes.orderItems}>
                  <img
                    className={classes.img}
                    src={item.productImage}
                    alt='aks'
                  />
                  <Box>
                    <Typography variant='h5' style={{ marginBottom: '.6rem' }}>
                      {item.productName}
                    </Typography>
                    <Box className={classes.product}>
                      <Typography variant='h6'>{`${item.productCount}x${item.productPrice}:`}</Typography>
                      <Box className={classes.product}>
                        <Typography
                          variant='h6'
                          style={{
                            marginRight: '.5rem',
                            marginLeft: '.3rem',
                          }}
                        >
                          {item.productCount * item.productPrice}
                        </Typography>
                        <Typography variant='h5'>تومان</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Fragment>
    </Grid>
  );
};

export default Payment;
