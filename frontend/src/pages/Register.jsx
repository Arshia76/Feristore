import React, { useState, useEffect, useContext, Fragment } from 'react';
import Loader from '../components/Loader/Loader';
import {
  Container,
  TextField,
  Typography,
  Box,
  FormControl,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../context/auth/AuthContext';
import UserContext from '../context/users/UserContext';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #748cb3, #635173, #9b5bd4)',
  },

  box: {
    border: '1px solid grey',
    padding: '0.5rem 1rem',
    backgroundColor: '#c2b2d1',
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

const Register = ({ history }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    email: '',
    password: '',
    username: '',
  });
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (authContext.error) {
      toast.error(authContext.error.msg || authContext.error.errors[0].msg);
    }
    authContext.clearErrors();
    authContext.setLoadingFalse();
    userContext.getUser(authContext.id);
    authContext.isAuthenticated && history.push('/');
    //eslint-disable-next-line
  }, [authContext.error, authContext.isAuthenticated, authContext.id]);

  const submit = (e) => {
    e.preventDefault();
    authContext.setLoading();
    authContext.register(JSON.stringify(state));
  };

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      {authContext.loading ? (
        <Loader />
      ) : (
        <Container className={classes.root} maxWidth='xl'>
          <Box className={classes.box}>
            <Typography className={classes.text} variant='h4'>
              ثبت نام
            </Typography>
            <FormControl className={classes.form}>
              <TextField
                name='username'
                type='text'
                label='نام کاربری'
                inputProps={{ style: { textAlign: 'right' } }}
                variant='outlined'
                onChange={onChange}
              />
              <TextField
                name='email'
                type='email'
                label='ایمیل'
                inputProps={{ style: { textAlign: 'right' } }}
                variant='outlined'
                onChange={onChange}
              />
              <TextField
                name='password'
                style={{ textAlign: 'right' }}
                type='password'
                label='رمز عبور'
                inputProps={{ style: { textAlign: 'right' } }}
                variant='outlined'
                onChange={onChange}
              />

              <Button type='submit' onClick={submit} className={classes.button}>
                ثبت نام
              </Button>
            </FormControl>
          </Box>
        </Container>
      )}
    </Fragment>
  );
};

export default Register;
