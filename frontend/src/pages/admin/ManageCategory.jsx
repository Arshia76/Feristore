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
import CategoryContext from '../../context/category/CategoryContext';

import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';

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
    padding: '.8rem',
    margin: '1rem 0',

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

const ManageCategory = ({ location, history }) => {
  const classes = useStyles();
  const categoryContext = useContext(CategoryContext);
  const { category, type } = location.state;

  useEffect(() => {
    if (categoryContext.error) {
      toast.error(
        categoryContext.error.msg || categoryContext.error.errors[0].msg
      );
    }
  }, [categoryContext.error]);

  const [state, setState] = useState({
    category: type === 'ایجاد دسته بندی' ? '' : category.category,
  });

  const submit = async (e) => {
    e.preventDefault();
    if (type === 'ایجاد دسته بندی') {
      categoryContext.setLoading();
      await categoryContext.createCategory(state);
      history.push('/admin/categories');
    } else {
      categoryContext.setLoading();
      await categoryContext.updateCategory(category._id, state);
      history.push('/admin/categories');
    }
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
          ایجاد دسته بندی
        </Typography>
        <FormControl className={classes.form}>
          <TextField
            name='category'
            type='text'
            label='دسته بندی'
            value={state.category}
            inputProps={{ style: { textAlign: 'right' } }}
            variant='outlined'
            onChange={onChange}
          />

          {categoryContext.loading ? (
            <Loader btn />
          ) : (
            <Button type='submit' onClick={submit} className={classes.button}>
              {type === 'ایجاد دسته بندی' ? 'ایجاد' : 'بروز رسانی'}
            </Button>
          )}
        </FormControl>
      </Box>
    </Container>
  );
};

export default ManageCategory;
