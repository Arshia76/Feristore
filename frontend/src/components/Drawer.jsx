import React, { Fragment, useContext, useEffect } from 'react';
import {
  Drawer as MuiDrawer,
  List,
  ListItemText,
  IconButton,
  Typography,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CategoryContext from '../context/category/CategoryContext';
import AuthContext from '../context/auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  list: {
    padding: '2rem 2rem',
    '& > *': {
      marginTop: '7rem',
      textDecoration: 'none',
      color: 'black',
    },
  },

  drawer: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25%',
    },
    backgroundColor: 'black',

    '&>*': {
      color: 'white',
    },
  },

  icon: {
    marginLeft: 'auto',
  },

  text: {
    textAlign: 'center',
    marignTop: '1rem',
  },

  listItem: {
    marginTop: '1rem',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',

    '&:hover': {
      backgroundColor: 'blue',
    },
  },
}));

const Drawer = ({ open, handleClose }) => {
  const classes = useStyles();
  const categoryContext = useContext(CategoryContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    categoryContext.getCategories();
  }, []);
  return (
    <MuiDrawer
      classes={{
        paper: classes.drawer,
      }}
      anchor='right'
      open={open}
      onClick={handleClose}
    >
      <IconButton className={classes.icon} ocClick={handleClose}>
        <ClearIcon />
      </IconButton>
      <Typography variant='h4' className={classes.text}>
        {authContext.isAdmin ? 'ادمین' : ' دسته بندی'}
      </Typography>
      <List className={classes.list}>
        {!authContext.isAdmin &&
          categoryContext.category.map((category) => {
            return (
              <Link to={`/categories/${category.category}`}>
                <ListItemText key={category._id} className={classes.listItem}>
                  {category.category}
                </ListItemText>
              </Link>
            );
          })}
        {authContext.isAdmin && (
          <Fragment>
            <Link to='/admin/customers'>
              <ListItemText className={classes.listItem}>مشتری ها</ListItemText>
            </Link>
            <Link to='/admin/products'>
              <ListItemText className={classes.listItem}>محصولات</ListItemText>
            </Link>
            <Link to='/admin/userorders'>
              <ListItemText className={classes.listItem}>سفارش ها</ListItemText>
            </Link>
            <Link to='/admin/categories'>
              <ListItemText className={classes.listItem}>
                دسته بندی
              </ListItemText>
            </Link>
          </Fragment>
        )}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
