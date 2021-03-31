import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  TextField,
  Typography,
  Box,
  FormControl,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../context/users/UserContext';
import AuthContext from '../context/auth/AuthContext';
import OrderContext from '../context/orders/OrderContext';
import Loader from '../components/Loader/Loader';
import { Fragment } from 'react';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    placeItems: 'center',
    height: '100%',

    padding: '1rem',
    background: 'linear-gradient(to right, #748cb3, #635173, #9b5bd4)',
  },

  box: {
    border: '1px solid grey',
    padding: '0.5rem 1rem',
    backgroundColor: '#c2b2d1',
    marginTop: '4rem',
  },
  text: {
    textAlign: 'center',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& > *': {
      marginTop: '1rem',
      color: 'white',
      background: 'white',
    },
  },

  button: {
    color: 'white',
    backgroundColor: 'blue',
    fontSize: '1.2rem',
    transition: 'all .4s linear',
    width: '100%',

    '&:hover': {
      color: 'blue',
      backgroundColor: 'white',
    },
  },
});

const OrderInformation = () => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const orderContext = useContext(OrderContext);

  const history = useHistory();
  const [state, setState] = useState({
    name: userContext.user && userContext.user.username,
    email: userContext.user && userContext.user.email,
    address: localStorage.getItem('personInfo')
      ? JSON.parse(localStorage.getItem('personInfo')).address
      : '',
    postalCode: localStorage.getItem('personInfo')
      ? JSON.parse(localStorage.getItem('personInfo')).postalCode
      : '',
    city: localStorage.getItem('personInfo')
      ? JSON.parse(localStorage.getItem('personInfo')).city
      : '',
    phoneNumber: localStorage.getItem('personInfo')
      ? JSON.parse(localStorage.getItem('personInfo')).phoneNumber
      : '',
  });

  useEffect(() => {
    orderContext.clearOrder();
    //eslint-disable-next-line
  }, [orderContext.order]);

  useEffect(() => {
    userContext.getUser(authContext.id);

    setState({
      ...state,
      name: userContext.user && userContext.user.username,
      email: userContext.user && userContext.user.email,
    });
    //eslint-disable-next-line
  }, [authContext.id, userContext.user]);

  useEffect(() => {
    if (state.name === '' || state.email === '') {
      history.push('/cart');
    }
    //eslint-disable-next-line
  }, [state.name, state.email]);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Fragment>
      {userContext.loading ? (
        <Loader />
      ) : (
        <Container className={classes.root} maxWidth='xl'>
          <Box className={classes.box}>
            <Typography className={classes.text} variant='h4'>
              مشخصات
            </Typography>
            <FormControl className={classes.form}>
              <TextField
                name='name'
                type='text'
                label='نام'
                value={state.name}
                inputProps={{ style: { textAlign: 'right' } }}
                variant='outlined'
                readOnly
              />
              <TextField
                name='email'
                type='email'
                label='ایمیل'
                value={state.email}
                inputProps={{ style: { textAlign: 'right' } }}
                variant='outlined'
                readOnly
              />
              <TextField
                name='phoneNumber'
                type='number'
                value={state.phoneNumber}
                label='شماره همراه'
                inputProps={{ style: { textAlign: 'right' } }}
                variant='outlined'
                onChange={onChange}
              />
              <TextField
                name='city'
                type='text'
                value={state.city}
                label='شهر'
                inputProps={{ style: { textAlign: 'right' } }}
                variant='outlined'
                onChange={onChange}
              />
              <TextField
                name='address'
                type='text'
                value={state.address}
                label='آدرس'
                multiline
                style={{ width: '100%' }}
                inputProps={{ style: { textAlign: 'right', height: '5rem' } }}
                variant='outlined'
                onChange={onChange}
              />
              <TextField
                name='postalCode'
                style={{ textAlign: 'right' }}
                type='number'
                label='کد پستی'
                value={state.postalCode}
                inputProps={{ style: { textAlign: 'right' } }}
                variant='outlined'
                onChange={onChange}
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    state.name === '' ||
                    state.email === '' ||
                    state.phoneNumber === '' ||
                    state.address === '' ||
                    state.postalCode === '' ||
                    state.city === ''
                  ) {
                    toast.error('لطفا تمام خانه ها را تکمیل کنید');
                  } else {
                    localStorage.setItem('personInfo', JSON.stringify(state));
                    history.push('/payment');
                  }
                }}
                type='submit'
                className={classes.button}
              >
                ثبت خرید
              </Button>
            </FormControl>
          </Box>
        </Container>
      )}
    </Fragment>
  );
};

export default OrderInformation;
