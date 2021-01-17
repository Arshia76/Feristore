import React from 'react';
import { Box, Button } from '@material-ui/core';
import ProductTable from '../../components/admin/ProductTable';

const Product = ({ history }) => {
  return (
    <Box>
      <Box style={{ textAlign: 'right', width: '87%', marginTop: '5rem' }}>
        <Button
          variant='outlined'
          style={{
            color: 'white',
            backgroundColor: 'black',
            padding: '.5rem 1rem',
            fontSize: '1.2rem',
          }}
          onClick={() =>
            history.push({
              pathname: '/admin/product/manage',
              state: {
                type: 'ایجاد محصول',
              },
            })
          }
        >
          افزودن محصول
        </Button>
      </Box>
      <ProductTable />
    </Box>
  );
};

export default Product;
