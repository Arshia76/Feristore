import React, { Fragment, useContext } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputBase,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CartContext from '../context/cart/CartContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    direction: 'rtl',
    width: '100%',
  },

  img: {
    width: '18vh',
    height: '18vh',
    marginTop: '1rem',
  },

  innerBox: {
    display: 'flex',
    alignItems: 'center',
  },
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const CartItem = ({
  image,
  name,
  price,
  _id,
  count,
  description,
  reviews,
  countInStock,
  category,
}) => {
  const classes = useStyles();
  const cartContext = useContext(CartContext);

  return (
    <Fragment>
      <Box className={classes.root}>
        <img
          className={classes.img}
          src={`https://feristore.herokuapp.com/${image}`}
          alt='aks'
        />
        <Typography>{name}</Typography>
        <Box className={classes.innerBox}>
          <Typography style={{ marginLeft: '.3rem' }}>{price}</Typography>
          <Typography>تومان</Typography>
        </Box>
        <FormControl style={{ margin: '1rem' }}>
          <InputLabel id='demo-customized-select-label'>تعداد</InputLabel>
          <Select
            labelId='demo-customized-select-label'
            id='demo-customized-select'
            value={count}
            onChange={(e) => {
              cartContext.addCart(
                {
                  name,
                  price,
                  category,
                  countInStock,
                  _id,
                  reviews,
                  image,
                  description,
                },
                Number(e.target.value)
              );
            }}
            input={<BootstrapInput />}
          >
            <MenuItem value=''>
              <em>تعداد</em>
            </MenuItem>
            {cartContext.cart.map((cart) => {
              return (
                cart._id === _id &&
                [...Array(cart.countInStock).keys()].map((e) => {
                  return <MenuItem value={e + 1}>{e + 1}</MenuItem>;
                })
              );
            })}
          </Select>
        </FormControl>
        <IconButton
          onClick={() => {
            cartContext.removeCart(_id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <hr style={{ width: '90%', height: '1px' }} />
    </Fragment>
  );
};

export default CartItem;
