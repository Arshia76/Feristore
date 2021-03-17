import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputBase,
  Button,
  TextField,
} from '@material-ui/core';
import ReactStars from 'react-stars';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ProductContext from '../context/products/ProductContext';
import CartContext from '../context/cart/CartContext';
import Comment from '../components/Comment';
import ReviewContext from '../context/review/ReviewContext';
import AuthContext from '../context/auth/AuthContext';
import { toast } from 'react-toastify';

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
    fontSize: 15,
    padding: '5px 26px 5px 12px',
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

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: '5rem',
    width: '100%',
    direction: 'rtl',
  },

  innerBox: {
    display: 'flex',
    alignItems: 'center',
  },

  img: {
    width: '40%',
    height: '25rem',
  },

  middle: {
    display: 'flex',
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '20rem',
  },

  third: {
    width: '30%',
    border: '2px solid #ebe6da ',
    padding: '1rem',
    textAlign: 'center',
  },

  thirdInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  hr: {
    width: '100%',
    color: '#ebe6da',
  },

  button: {
    color: 'white',
    backgroundColor: 'blue',
    fontSize: '1.1rem',
    transition: 'all .4s linear ',
    width: '80%',
    margin: '1rem 0',

    '&:hover': {
      backgroundColor: 'red',
    },
  },

  comments: {
    display: 'block',
    marginTop: '4rem',
    textAlign: 'right',
    width: '50%',
  },

  commentRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
});

const Detail = ({ match }) => {
  const productContext = useContext(ProductContext);
  const cartContext = useContext(CartContext);
  const reviewContext = useContext(ReviewContext);
  const authContext = useContext(AuthContext);

  const history = useHistory();
  const classes = useStyles();

  const [state, setState] = useState({
    review: '',
    rating: '',
    reviewer: authContext.user,
  });

  useEffect(() => {
    productContext.productDetail(match.params.id);
    reviewContext.getProductReviews(match.params.id);
    if (reviewContext.error) {
      toast.error(reviewContext.error.msg || reviewContext.error.errors[0].msg);
    }
    //eslint-disable-next-line
  }, [match.params.id, reviewContext.reviews, reviewContext.error]);

  const [stock, setStock] = React.useState(1);

  return (
    <Fragment>
      <Container className={classes.root}>
        <img
          className={classes.img}
          src={`http://localhost:5000/${productContext.product.image}`}
          alt='aks'
        />
        <Box className={classes.middle}>
          <Typography gutterBottom variant='h4'>
            {productContext.product.name}
          </Typography>
          <hr className={classes.hr} />
          <Box className={classes.innerBox}>
            <ReactStars
              edit={false}
              value={productContext.product.rating}
              color2={'#ffd700'}
              count={5}
              size={24}
              half={false}
            />
            <Box className={classes.innerBox} style={{ marginRight: '.3rem' }}>
              <Typography style={{ marginLeft: '.3rem' }}>
                {productContext.product.numOfReviews}
              </Typography>
              <Typography>نظر</Typography>
            </Box>
          </Box>
          <hr className={classes.hr} />
          <Box className={classes.innerBox}>
            <Typography style={{ marginLeft: '.3rem' }}>
              {productContext.product.price}
            </Typography>
            <Typography>تومان</Typography>
          </Box>
          <hr className={classes.hr} />
          <Typography style={{ wordBreak: 'break-word' }}>
            {productContext.product.description}
          </Typography>
        </Box>
        <Box className={classes.third}>
          <Box className={classes.thirdInner}>
            <Typography>موجود :</Typography>
            <Typography>
              {productContext.product.countInStock > 0 ? 'موجود' : 'نا موجود'}
            </Typography>
          </Box>
          <hr className={classes.hr} />
          <Box className={classes.thirdInner}>
            <Typography>مقدار :</Typography>
            <FormControl style={{ margin: '1rem' }}>
              <InputLabel id='demo-customized-select-label'>تعداد </InputLabel>
              <Select
                labelId='demo-customized-select-label'
                id='demo-customized-select'
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
                input={<BootstrapInput />}
              >
                <MenuItem value=''>
                  <em>تعداد</em>
                </MenuItem>

                {[...Array(productContext.product.countInStock).keys()].map(
                  (e) => {
                    return (
                      <MenuItem key={e} value={e + 1}>
                        {e + 1}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </FormControl>
          </Box>
          <hr className={classes.hr} />
          {cartContext.cart.some(
            (p) => p._id === productContext.product._id
          ) ? (
            <Typography>محصول به سبد اضافه شده است</Typography>
          ) : (
            <Button
              disabled={productContext.product.countInStock === 0}
              className={classes.button}
              onClick={() => {
                cartContext.addCart(productContext.product, stock);
                history.push('/cart');
              }}
            >
              افزودن به سبد
            </Button>
          )}
        </Box>
      </Container>
      <Container className={classes.commentRoot}>
        <Box className={classes.comments}>
          <Typography variant='h2'>نظرات</Typography>
        </Box>
        <Box
          style={{
            width: '50%',
            textAlign: 'right',
          }}
        >
          <hr />
        </Box>
        <Box
          style={{
            width: '50%',
            marginBottom: '1rem',
            height: '60vh',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollbarColor: '#a4b0bd #d5d9df',
          }}
        >
          {reviewContext.reviews &&
            reviewContext.reviews.map((r) => {
              return (
                <Comment
                  username={r.reviewer}
                  comment={r.review}
                  rating={r.rating}
                />
              );
            })}
        </Box>
        <TextField
          style={{ marginTop: '1rem' }}
          type='text'
          variant='outlined'
          inputProps={{ style: { textAlign: 'right' } }}
          value={state.review}
          label='نظر'
          onChange={(e) => setState({ ...state, review: e.target.value })}
        />
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row-reverse',
            marginTop: '1rem',
          }}
        >
          <Typography style={{ marginLeft: '2rem' }}>
            امتیاز خود را مشخص کنید
          </Typography>
          <ReactStars
            half={false}
            value={parseInt(state.rating)}
            color2={'#ffd700'}
            count={5}
            size={24}
            onChange={(value) => setState({ ...state, rating: value })}
          />
        </Box>
        <Button
          style={{ margin: '1rem 0' }}
          variant='outlined'
          onClick={() => {
            reviewContext.createReview(match.params.id, state);
            if (!reviewContext.error) {
              toast.success(reviewContext.message.msg);
            }
            setState({ rating: '', review: '' });
          }}
        >
          ثبت
        </Button>
      </Container>
    </Fragment>
  );
};

export default Detail;
