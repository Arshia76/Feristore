import React, { useState, useContext, useEffect, Fragment } from 'react';
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
import { Pagination } from '@material-ui/lab';
import ReactStars from 'react-stars';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ProductContext from '../context/products/ProductContext';
import CartContext from '../context/cart/CartContext';
import Comment from '../components/Comment';
import ReviewContext from '../context/review/ReviewContext';
import AuthContext from '../context/auth/AuthContext';
import { toast } from 'react-toastify';
import Loader from '../components/Loader/Loader';

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: '5rem',
    width: '100%',
    direction: 'rtl',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  innerBox: {
    display: 'flex',
    alignItems: 'center',
  },

  img: {
    width: '40%',
    height: '25rem',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },

  middle: {
    display: 'flex',
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '20rem',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      margin: '2rem 0',
    },
  },

  third: {
    width: '30%',
    border: '2px solid #ebe6da ',
    padding: '1rem',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
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
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },

  commentRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  commentBody: {
    width: '50%',
    marginBottom: '1rem',
    height: '60vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    scrollbarColor: '#a4b0bd #d5d9df',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
  hrStyle: {
    width: '50%',
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
}));

const Detail = ({ match }) => {
  const productContext = useContext(ProductContext);
  const cartContext = useContext(CartContext);
  const reviewContext = useContext(ReviewContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const [state, setState] = useState({
    review: '',
    rating: '',
    reviewer: authContext.user,
  });

  useEffect(
    () => {
      productContext.productDetail(match.params.id);
      reviewContext.getProductReviews(match.params.id, 10, page);
      if (reviewContext.message !== '') {
        toast.success(reviewContext.message.msg);
      }
    },
    //eslint-disable-next-line
    [match, reviewContext.message]
  );

  useEffect(() => {
    if (reviewContext.error !== null) {
      toast.error(reviewContext.error.msg || reviewContext.error.errors[0].msg);
    }

    //eslint-disable-next-line
  }, [reviewContext.error]);

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
        <Box className={classes.hrStyle}>
          <hr />
        </Box>
        <Box className={classes.commentBody}>
          {reviewContext.loading ? (
            <Loader />
          ) : (
            reviewContext.reviews.results &&
            reviewContext.reviews.results.map((r) => {
              return (
                <Comment
                  username={r.reviewer}
                  comment={r.review}
                  rating={r.rating}
                />
              );
            })
          )}
          {reviewContext.reviews.pages > 1 && (
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                margin: '2rem 0',
              }}
            >
              <Pagination
                color='primary'
                size='large'
                variant='outlined'
                count={reviewContext.reviews.pages}
                page={page}
                onChange={(e, value) => {
                  reviewContext.setLoading();
                  setPage(value);
                  reviewContext.getProductReviews(match.params.id, 10, value);
                }}
              />
            </Box>
          )}
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
            reviewContext.setLoading();
            reviewContext.createReview(match.params.id, state);

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
