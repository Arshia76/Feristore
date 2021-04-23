import React, { Fragment, useContext, useEffect } from 'react';
import {
  Drawer as MuiDrawer,
  List,
  ListItemText,
  IconButton,
  Typography,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CategoryContext from '../context/category/CategoryContext';
import ProductContext from '../context/products/ProductContext';
import OrderContext from '../context/orders/OrderContext';
import UserContext from '../context/users/UserContext';
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
    overflowX: 'hidden',
    overflowY: 'auto',
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
  const productContext = useContext(ProductContext);
  const userContext = useContext(UserContext);
  const orderContext = useContext(OrderContext);
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    categoryContext.getCategories(1000, 1);
    //eslint-disable-next-line
  }, [`${categoryContext.category}`]);
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
        <Link
          to='/'
          onClick={pathname !== '/' ? () => productContext.setLoading() : null}
        >
          <ListItemText className={classes.listItem}>صفحه اصلی</ListItemText>
        </Link>
        {!authContext.isAdmin &&
          categoryContext.category.results &&
          categoryContext.category.results.map((category) => {
            return (
              <Link
                to={`/categories/${category.category}`}
                key={category._id}
                onClick={
                  pathname !== `/categories/${category.category}`
                    ? () => productContext.setLoading()
                    : null
                }
              >
                <ListItemText className={classes.listItem}>
                  {category.category}
                </ListItemText>
              </Link>
            );
          })}
        {authContext.isAdmin && (
          <Fragment>
            <Link
              to='/admin/customers'
              onClick={
                pathname !== '/admin/customers'
                  ? () => userContext.setLoading()
                  : null
              }
            >
              <ListItemText className={classes.listItem}>مشتری ها</ListItemText>
            </Link>
            <Link
              to='/admin/products'
              onClick={
                pathname !== '/admin/products'
                  ? () => productContext.setLoading()
                  : null
              }
            >
              <ListItemText className={classes.listItem}>محصولات</ListItemText>
            </Link>
            <Link
              to='/admin/userorders'
              onClick={
                pathname !== '/admin/userorders'
                  ? () => orderContext.setLoading()
                  : null
              }
            >
              <ListItemText className={classes.listItem}>سفارش ها</ListItemText>
            </Link>
            <Link
              to='/admin/categories'
              onClick={
                pathname !== '/admin/categories'
                  ? () => categoryContext.setLoading()
                  : null
              }
            >
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
