import React, { useState, useContext, Fragment, useEffect } from 'react';
import Utility from '../utils/Utility';
import QueryString from 'query-string';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OrderContext from '../context/orders/OrderContext';
import { toast } from 'react-toastify';
import Loader from '../components/Loader/Loader';

const useStyles = makeStyles({
  root: {
    marginTop: '5rem',
    padding: '2rem',
    width: '100%',
  },
  btn: {
    width: '50%',
    margin: '1rem 0',
    fontSize: '18px',
    color: 'black',
    backgroundColor: 'white',
    transition: 'all .5s linear',
    border: '1px solid black',

    '&:hover': {
      color: 'white',
      backgroundColor: 'black',
    },
  },

  link: {
    width: '50%',
    margin: '1rem 0',
    textDecoration: 'none',
    padding: '.5rem',
    display: 'inline-block',
    border: '1px solid black',
    fontSize: '18px',
    color: 'black',
    backgroundColor: 'white',
    transition: 'all .5s linear',

    '&:hover': {
      color: 'white',
      backgroundColor: 'black',
    },
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

const OrderDetail = ({ match, history, location }) => {
  const classes = useStyles();
  let qs = QueryString.parse(location.search);
  const orderContext = useContext(OrderContext);

  useEffect(() => {
    orderContext.getOrder(match.params.id);

    //eslint-disable-next-line
  }, [match.params.id]);

  useEffect(() => {
    if (qs.Status) {
      if (qs.Status === 'OK') {
        const fun = async () => {
          await orderContext.getOrder(match.params.id);

          orderContext.order.totalPrice !== undefined &&
            (await orderContext.verifyOrder(
              orderContext.order.totalPrice,
              qs.Authority
            ));

          orderContext.order.totalPrice !== undefined &&
            (await orderContext.updatePayDate(match.params.id));
        };
        fun();

        orderContext.order.totalPrice !== undefined &&
          toast.success('تراکنش با موفقیت انجام شد');
        orderContext.order.totalPrice !== undefined &&
          localStorage.removeItem('cart');
        // orderContext.order.totalPrice !== undefined &&
        //   orderContext.clearOrder();

        orderContext.order.totalPrice !== undefined && history.push('/');
      } else {
        toast.error(
          'تراکنش با شکست مواجه شد پول شما طی 24 ساعت به حسابتان واریز می شود'
        );
        history.push('/');
      }
    }
    //eslint-disable-next-line
  }, [qs.Authority, qs.Status, orderContext.order]);

  const [sendPrice] = useState(2000);
  return (
    <Grid container className={classes.root} spacing={4}>
      {orderContext.loading ? (
        <Loader />
      ) : (
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
                      {Utility.formatMoney(orderContext.order.productPrice)}
                    </Typography>
                    <Typography>تومان</Typography>
                  </Box>
                </Box>
                <Box className={classes.orderDetailInner}>
                  <Typography>هزینه ارسال:</Typography>
                  <Box className={classes.orderPrice}>
                    <Typography style={{ marginLeft: '.3rem' }}>
                      {Utility.formatMoney(sendPrice)}
                    </Typography>
                    <Typography>تومان</Typography>
                  </Box>
                </Box>
                <Box className={classes.orderDetailInner}>
                  <Typography>قیمت کل:</Typography>
                  <Box className={classes.orderPrice}>
                    <Typography style={{ marginLeft: '.3rem' }}>
                      {Utility.formatMoney(orderContext.order.totalPrice)}
                    </Typography>
                    <Typography>تومان</Typography>
                  </Box>
                </Box>
              </Box>
              <hr />
              <Box style={{ width: '100%', textAlign: 'center' }}>
                {orderContext.order.payDate !== 'پرداخت نشده' ? (
                  <Typography variant='h6'>پرداخت شده</Typography>
                ) : orderContext.url !== '' ? (
                  <a className={classes.link} href={orderContext.url}>
                    پرداخت
                  </a>
                ) : (
                  <Button
                    className={classes.btn}
                    onClick={() => {
                      orderContext.setLoading();
                      orderContext.pay(
                        orderContext.order._id,
                        orderContext.order.totalPrice,
                        orderContext.order.user.email,
                        orderContext.order.user.phoneNumber
                      );
                    }}
                  >
                    نهایی کردن
                  </Button>
                )}
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
              <Typography variant='h6'>
                {orderContext.order.user && orderContext.order.user.name}
              </Typography>
            </Box>
            <Box className={classes.Inner}>
              <Typography variant='h6' style={{ marginLeft: '1rem' }}>
                ایمیل:
              </Typography>
              <Typography variant='h6'>
                {orderContext.order.user && orderContext.order.user.email}
              </Typography>
            </Box>
            <Box className={classes.Inner}>
              <Typography variant='h6' style={{ marginLeft: '1rem' }}>
                تلفن:
              </Typography>
              <Typography variant='h6'>
                {orderContext.order.user && orderContext.order.user.phoneNumber}
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
                {orderContext.order.shipping &&
                  orderContext.order.shipping.address}
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
                {orderContext.order.shipping &&
                  orderContext.order.shipping.city}
              </Typography>
            </Box>
            <Box className={classes.Inner}>
              <Typography variant='h6' style={{ marginLeft: '1rem' }}>
                کد پستی:
              </Typography>
              <Typography variant='h6'>
                {orderContext.order.shipping &&
                  orderContext.order.shipping.postalCode}
              </Typography>
            </Box>
            <hr style={{ margin: '2rem 0' }} />
            <Box>
              <Typography variant='h4'>محصولات</Typography>
              {orderContext.order.orderItems &&
                orderContext.order.orderItems.map((item) => {
                  return (
                    <Box className={classes.orderItems}>
                      <img
                        className={classes.img}
                        src={`https://feristore.onrender.com/${item.productImage}`}
                        alt='aks'
                      />
                      <Box>
                        <Typography
                          variant='h5'
                          style={{ marginBottom: '.6rem' }}
                        >
                          {item.productName}
                        </Typography>
                        <Box className={classes.product}>
                          <Typography variant='body1'>{`${
                            item.productCount
                          }x${Utility.formatMoney(
                            item.productPrice
                          )}:`}</Typography>
                          <Box className={classes.product}>
                            <Typography
                              variant='body1'
                              style={{
                                marginRight: '.5rem',
                                marginLeft: '.3rem',
                              }}
                            >
                              {Utility.formatMoney(
                                item.productCount * item.productPrice
                              )}
                            </Typography>
                            <Typography variant='body1'>تومان</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
};

export default OrderDetail;
