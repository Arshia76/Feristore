import React, { useState, useEffect, useContext } from 'react';
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
  const history = useHistory();
  const [state, setState] = useState({
    name: localStorage.getItem('personInfo')
      ? JSON.parse(localStorage.getItem('personInfo')).name
      : '',
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

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container className={classes.root} fluid maxWidth='xl'>
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
            onChange={onChange}
          />
          <TextField
            name='phoneNumber'
            type='text'
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
            inputProps={{
              style: { textAlign: 'right', height: '5rem', width: '22.8rem' },
            }}
            variant='outlined'
            onChange={onChange}
          />
          <TextField
            name='postalCode'
            style={{ textAlign: 'right' }}
            type='text'
            label='کد پستی'
            value={state.postalCode}
            inputProps={{ style: { textAlign: 'right' } }}
            variant='outlined'
            onChange={onChange}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              localStorage.setItem('personInfo', JSON.stringify(state));
              history.push('/orderDetail');
            }}
            type='submit'
            className={classes.button}
          >
            ثبت خرید
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default OrderInformation;
