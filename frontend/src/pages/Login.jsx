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

  text: {
    textAlign: 'center',
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

  typog: {
    color: 'black',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
});

const Login = ({ history }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (authContext.error) {
      toast.error(authContext.error.msg || authContext.error.errors[0].msg);
    }

    authContext.clearErrors();
    userContext.getUser(authContext.id);
    authContext.isAuthenticated && history.push('/');
  }, [authContext.error, authContext.isAuthenticated, authContext.id]);

  const submit = (e) => {
    e.preventDefault();
    authContext.login(JSON.stringify(state));
  };

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
          ورود
        </Typography>
        <FormControl className={classes.form}>
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
            ورود
          </Button>

          <Typography className={classes.typog}>
            رمز خود را فراموش کرده ام؟
          </Typography>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Login;
