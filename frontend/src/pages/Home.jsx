import React, { useEffect, useContext } from 'react';
import { Container } from '@material-ui/core';
import Slider from '../components/Slider';
import PopularProducts from '../components/PopularProducts';
import { toast } from 'react-toastify';
import ProductContext from '../context/products/ProductContext';
import DiscountSlider from '../components/DiscountSlider';

const Home = () => {
  const productContext = useContext(ProductContext);

  useEffect(() => {
    if (productContext.error) {
      toast.error(
        productContext.error.msg || productContext.error.errors[0].msg
      );
    }

    productContext.clearErrors();
  }, [productContext.error]);
  return (
    <Container
      style={{ backgroundColor: '#caeddf', marginTop: '4rem' }}
      maxWidth='xl'
    >
      <Container maxWidth='md'>
        <Slider />
        <DiscountSlider />
        <PopularProducts />
      </Container>
    </Container>
  );
};

export default Home;
