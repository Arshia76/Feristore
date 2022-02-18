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
import Loader from '../components/Loader/Loader';

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
    width: '30%',
    '@media(max-width:1100px)': {
      width: '40%',
    },
    '@media(max-width:768px)': {
      width: '60%',
    },
    '@media(max-width:600px)': {
      width: '80%',
    },
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

const Profile = ({ match }) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const fun = () => {
    userContext.getUser(authContext.id);
    setState({
      username: userContext.user && userContext.user.username,
      email: userContext.user && userContext.user.email,
      password: '',
      newPassword: '',
    });
  };

  useEffect(() => {
    if (userContext.error) {
      toast.error(userContext.error.msg || userContext.error.errors[0].msg);
    } else if (authContext.error) {
      toast.error(authContext.error.msg || authContext.error.errors[0].msg);
    } else if (userContext.message !== '') {
      toast.success(userContext.message);
    }

    fun();
    //eslint-disable-next-line
  }, [authContext.error, userContext.error, userContext.message, match]);

  const [state, setState] = useState({
    username: userContext.user && userContext.user.username,
    email: userContext.user && userContext.user.email,
    password: '',
    newPassword: '',
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    userContext.setLoading();
    await userContext.updateUser(authContext.id, state);
  };

  return (
    <Container className={classes.root} maxWidth='xl'>
      {userContext.loading ? (
        <Loader />
      ) : (
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
              style={{ width: '100%' }}
              inputProps={{ style: { textAlign: 'right' } }}
              variant='outlined'
            />
            <TextField
              name='email'
              type='email'
              value={state.email}
              onChange={onChange}
              style={{ width: '100%' }}
              label='ایمیل'
              inputProps={{ style: { textAlign: 'right' } }}
              variant='outlined'
            />
            <TextField
              name='password'
              style={{ textAlign: 'right', width: '100%' }}
              value={state.password}
              onChange={onChange}
              type='password'
              label='رمز عبور فعلی'
              inputProps={{ style: { textAlign: 'right' } }}
              variant='outlined'
            />
            <TextField
              name='newPassword'
              style={{ textAlign: 'right', width: '100%' }}
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
      )}
    </Container>
  );
};

export default Profile;
