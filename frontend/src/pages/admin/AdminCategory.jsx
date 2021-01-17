import React from 'react';
import { Box, Button } from '@material-ui/core';
import CategoryTable from '../../components/admin/CategoryTable';

const AdminCategory = ({ history }) => {
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
              pathname: '/admin/category/manage',
              state: {
                type: 'ایجاد دسته بندی',
              },
            })
          }
        >
          افزودن دسته بندی
        </Button>
      </Box>
      <CategoryTable />
    </Box>
  );
};

export default AdminCategory;
