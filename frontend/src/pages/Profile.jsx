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
import UserContext from '../context/users/UserContext';
import AuthContext from '../context/auth/AuthContext';
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
});

const Profile = () => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    userContext.getUser(authContext.id);
    if (userContext.error) {
      toast.error(userContext.error.msg || userContext.error.errors[0].msg);
      userContext.clearErrors();
    }

    if (authContext.error) {
      toast.error(authContext.error.msg || authContext.error.errors[0].msg);
      userContext.clearErrors();
    }

    if (!authContext.error && !userContext.error) {
      setState({
        username: userContext.user && userContext.user.username,
        email: userContext.user && userContext.user.email,
        password: '',
        newPassword: '',
      });
    }

    //eslint-disable-next-line
  }, [authContext.error, userContext.error, userContext.user]);

  const [state, setState] = useState({
    username: userContext.user && userContext.user.username,
    email: userContext.user && userContext.user.email,
    password: '',
    newPassword: '',
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    userContext.updateUser(authContext.id, state);
    if (authContext.error === null && userContext.error === null) {
      toast.success('بروز رسانی انجام شد');
      setState({ ...state, password: '', newPassword: '' });
    }
  };

  return (
    <Container className={classes.root} maxWidth='xl'>
      <Box className={classes.box}>
        <Typography className={classes.text} variant='h4'>
          مشخصات
        </Typography>
        <FormControl className={classes.form}>
          <TextField
            name='username'
            type='text'
            value={state.username}
            onChange={onChange}
            label='نام کاربری'
            inputProps={{ style: { textAlign: 'right' } }}
            variant='outlined'
          />
          <TextField
            name='email'
            type='email'
            value={state.email}
            onChange={onChange}
            label='ایمیل'
            inputProps={{ style: { textAlign: 'right' } }}
            variant='outlined'
          />
          <TextField
            name='password'
            style={{ textAlign: 'right' }}
            value={state.password}
            onChange={onChange}
            type='password'
            label='رمز عبور فعلی'
            inputProps={{ style: { textAlign: 'right' } }}
            variant='outlined'
          />
          <TextField
            name='newPassword'
            style={{ textAlign: 'right' }}
            value={state.newPassword}
            onChange={onChange}
            type='password'
            label='رمز عبور جدید'
            inputProps={{ style: { textAlign: 'right' } }}
            variant='outlined'
          />
          <Button type='submit' onClick={submit} className={classes.button}>
            بروز رسانی
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Profile;
