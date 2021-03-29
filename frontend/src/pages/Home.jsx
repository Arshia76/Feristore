import React, { useEffect, useContext } from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import Slider from '../components/Slider';
import PopularProducts from '../components/PopularProducts';
import { toast } from 'react-toastify';
import ProductContext from '../context/products/ProductContext';
import OrderContext from '../context/orders/OrderContext';
import DiscountSlider from '../components/DiscountSlider';
import { Fragment } from 'react';

const Home = () => {
  const productContext = useContext(ProductContext);
  const orderContext = useContext(OrderContext);

  useEffect(() => {
    if (productContext.error) {
      toast.error(
        productContext.error.msg || productContext.error.errors[0].msg
      );
    }

    productContext.clearErrors();

    //eslint-disable-next-line
  }, [productContext.error]);

  useEffect(() => {
    productContext.getDiscountProducts();

    //eslint-disable-next-line
  }, [`${productContext.discountedProducts}`]);

  useEffect(() => {
    orderContext.getAllOrders();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    productContext.getNewProducts();

    //eslint-disable-next-line
  }, [`${productContext.newProducts}`]);

  useEffect(() => {
    productContext.getSpecialProducts(6, 1);

    //eslint-disable-next-line
  }, [`${productContext.specialProducts}`]);

  return (
    <Container style={{ marginTop: '4rem' }} maxWidth='xl'>
      <Container maxWidth='md'>
        {productContext.discountedProducts.length === 0 &&
        productContext.newProducts.length === 0 &&
        productContext.specialProducts.results &&
        productContext.specialProducts.results.length === 0 ? (
          <Box
            style={{
              height: '30rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant='h3'>محصولی وجود ندارد</Typography>
          </Box>
        ) : (
          <Fragment>
            <Slider />
            <DiscountSlider />
            <PopularProducts />
          </Fragment>
        )}
      </Container>
    </Container>
  );
};

export default Home;
