import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@material-ui/core';
import CategoryContext from '../../context/category/CategoryContext';
import ProductContext from '../../context/products/ProductContext';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    placeItems: 'center',
    height: '100%',
    background: 'linear-gradient(to right, #748cb3, #635173, #9b5bd4)',
  },
  box: {
    border: '1px solid grey',
    padding: '0.5rem 1rem',
    backgroundColor: '#c2b2d1',
    marginTop: '5rem',
    marginBottom: '5rem',
  },

  textfield: {
    width: '100%',
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
    width: '75%',
    margin: '2rem 0',
    padding: '1rem',

    '&:hover': {
      color: 'blue',
      backgroundColor: 'white',
    },
  },
  formgroup: {
    display: 'flex ',
    flexDirection: 'row ',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '.5rem',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'flex-end',
    },
  },

  textField: {
    textAlign: 'right',
    width: '25%',
    [theme.breakpoints.down('sm')]: {
      width: '50% !important',
      marginTop: '1rem',
      marginRight: '1.5rem',
    },
  },
  checkbox: {
    color: 'black',
    direction: 'rtl',
  },
}));

const ManageProduct = ({ history, location }) => {
  const classes = useStyles();
  const categoryContext = useContext(CategoryContext);
  const productContext = useContext(ProductContext);

  const {
    type,
    name,
    description,
    price,
    countInStock,
    productImage,
    special,
    carousel,
    category,
    id,
    discount,
  } = location.state;

  const [state, setState] = React.useState({
    name: type === 'ایجاد محصول' ? '' : name,
    price: type === 'ایجاد محصول' ? '' : price,
    description: type === 'ایجاد محصول' ? '' : description,
    productImage: type === 'ایجاد محصول' ? '' : productImage,
    countInStock: type === 'ایجاد محصول' ? '' : countInStock,
    special: type === 'ایجاد محصول' ? false : special,
    carousel: type === 'ایجاد محصول' ? false : carousel,
    category: type === 'ایجاد محصول' ? '' : category,
    discount: type === 'ایجاد محصول' ? 0 : discount,
  });

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('name', state.name);
    formdata.append('price', state.price);
    formdata.append('description', state.description);
    formdata.append('countInStock', state.countInStock);
    formdata.append('category', state.category);
    formdata.append('carousel', state.carousel);
    formdata.append('special', state.special);
    formdata.append('productImage', state.productImage);
    formdata.append('discount', state.discount);
    if (type === 'ایجاد محصول') {
      productContext.setLoading();
      productContext.createProduct(formdata);
      history.push('/admin/products');
    } else {
      productContext.setLoading();
      productContext.updateProduct(id, formdata);
      history.push('/admin/products');
    }
  };
  useEffect(() => {
    if (productContext.error) {
      toast.error(
        productContext.error.msg || productContext.error.errors[0].msg
      );
    }
  }, [productContext.error]);
  const body = (
    <Container fluid className={classes.root} maxWidth='xl'>
      <Box className={classes.box}>
        <Typography className={classes.text} variant='h4'>
          ایجاد محصول
        </Typography>
        <FormControl className={classes.form} encType='multipart/form-data'>
          <TextField
            name='name'
            type='text'
            value={state.name}
            className={classes.textfield}
            label='نام محصول'
            inputProps={{ style: { textAlign: 'right' } }}
            variant='outlined'
            onChange={onChange}
          />
          <TextField
            name='price'
            type='number'
            value={state.price}
            className={classes.textfield}
            label='قیمت'
            inputProps={{ style: { textAlign: 'right' } }}
            variant='outlined'
            onChange={onChange}
          />
          <TextField
            name='description'
            style={{ textAlign: 'right' }}
            value={state.description}
            type='text'
            className={classes.textfield}
            multiline
            label='ویژگی محصول'
            inputProps={{ style: { textAlign: 'right', height: '5rem' } }}
            variant='outlined'
            onChange={onChange}
          />
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={state.category}
            onChange={onChange}
            className={classes.textfield}
            name='category'
            style={{
              textAlign: 'right',
              color: 'black',
            }}
          >
            <MenuItem value=''>
              <em>دسته بندی محصول</em>
            </MenuItem>
            {categoryContext.category.results &&
              categoryContext.category.results.map((category) => {
                return (
                  <MenuItem key={category._id} value={category.category}>
                    {category.category}
                  </MenuItem>
                );
              })}
          </Select>
          <TextField
            style={{ textAlign: 'right', width: '100%' }}
            type='file'
            inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
            variant='outlined'
            onChange={(e) =>
              setState({ ...state, productImage: e.target.files[0] })
            }
          />

          <FormGroup className={classes.formgroup}>
            <FormControlLabel
              className={classes.checkbox}
              control={
                <Checkbox
                  checked={state.carousel}
                  value={state.carousel}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.checked })
                  }
                  name='carousel'
                />
              }
              label='محصول جدید'
            />
            <FormControlLabel
              className={classes.checkbox}
              control={
                <Checkbox
                  checked={state.special}
                  value={state.special}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.checked })
                  }
                  name='special'
                />
              }
              label='محصول ویژه'
            />
            <TextField
              name='countInStock'
              className={classes.textField}
              value={state.countInStock}
              type='number'
              label='تعداد محصول'
              inputProps={{ style: { textAlign: 'right' } }}
              variant='outlined'
              onChange={onChange}
            />
            <TextField
              name='discount'
              className={classes.textField}
              value={state.discount}
              type='number'
              label='درصد تخفیف محصول'
              inputProps={{ style: { textAlign: 'right' } }}
              variant='outlined'
              onChange={onChange}
            />
          </FormGroup>
          <Button type='submit' onClick={submit} className={classes.button}>
            {type === 'ایجاد محصول' ? 'ایجاد محصول' : 'بروز رسانی محصول'}
          </Button>
        </FormControl>
      </Box>
    </Container>
  );

  return <div>{body}</div>;
};

export default ManageProduct;
