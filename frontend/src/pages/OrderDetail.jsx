import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const OrderDetail = () => {
  const classes = useStyles();
  const [productPrice] = useState(() =>
    JSON.parse(localStorage.getItem('cart')).reduce(
      (tot, cur) => tot + cur.price * cur.count,
      0
    )
  );
  const [sendPrice] = useState(2000);
  return (
    <Grid container className={classes.root} spacing={4}>
      <Grid
        justify='space-around'
        align='center'
        direction='column'
        item
        xs={12}
        sm={4}
      >
        <Box className={classes.orderDetail}>
          <Typography style={{ margin: '.5rem 0' }} variant='h4'>
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
                  {productPrice + sendPrice}
                </Typography>
                <Typography>تومان</Typography>
              </Box>
            </Box>
          </Box>
          <hr />
          <Button className={classes.btn} variant='outlined'>
            ثبت سفارش
          </Button>
        </Box>
      </Grid>
      <Grid style={{ direction: 'rtl' }} direction='column' item xs={12} sm={8}>
        <Typography variant='h4'>مشخصات</Typography>
        <Box className={classes.Inner}>
          <Typography variant='h6' style={{ marginLeft: '1rem' }}>
            نام:
          </Typography>
          <Typography variant='h6'>
            {JSON.parse(localStorage.getItem('personInfo')).name}
          </Typography>
        </Box>
        <Box className={classes.Inner}>
          <Typography variant='h6' style={{ marginLeft: '1rem' }}>
            تلفن:
          </Typography>
          <Typography variant='h6'>
            {JSON.parse(localStorage.getItem('personInfo')).phoneNumber}
          </Typography>
        </Box>
        <Box className={classes.Inner}>
          <Typography
            variant='h6'
            style={{ marginLeft: '1rem', wordBreak: 'break-word' }}
          >
            آدرس:
          </Typography>
          <Typography variant='h6'>
            {JSON.parse(localStorage.getItem('personInfo')).address}
          </Typography>
        </Box>
        <Box className={classes.Inner}>
          <Typography
            variant='h6'
            style={{ marginLeft: '1rem', wordBreak: 'break-word' }}
          >
            شهر:
          </Typography>
          <Typography variant='h6'>
            {JSON.parse(localStorage.getItem('personInfo')).city}
          </Typography>
        </Box>
        <Box className={classes.Inner}>
          <Typography variant='h6' style={{ marginLeft: '1rem' }}>
            کد پستی:
          </Typography>
          <Typography variant='h6'>
            {JSON.parse(localStorage.getItem('personInfo')).postalCode}
          </Typography>
        </Box>
        <hr style={{ margin: '2rem 0' }} />
        <Box>
          <Typography variant='h4'>محصولات</Typography>
          {JSON.parse(localStorage.getItem('cart')).map((c) => {
            return (
              <Box className={classes.orderItems}>
                <img className={classes.img} src={c.image} alt='aks' />
                <Box>
                  <Typography variant='h5' style={{ marginBottom: '.6rem' }}>
                    {c.name}
                  </Typography>
                  <Box className={classes.product}>
                    <Typography variant='h6'>{`${c.count}x${c.price}:`}</Typography>
                    <Box className={classes.product}>
                      <Typography
                        variant='h6'
                        style={{ marginRight: '.5rem', marginLeft: '.3rem' }}
                      >
                        {c.count * c.price}
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
    </Grid>
  );
};

export default OrderDetail;
