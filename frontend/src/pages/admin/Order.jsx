import React, { useContext, useEffect } from 'react';
import { Box } from '@material-ui/core';
import OrderTable from '../../components/admin/OrderTable';
import OrderContext from '../../context/orders/OrderContext';

const Order = () => {
  const orderContext = useContext(OrderContext);
  useEffect(() => {
    orderContext.getAllOrders();
    //eslint-disable-next-line
  }, [orderContext.orders]);
  return (
    <Box>
      <OrderTable orders={orderContext.orders} />
    </Box>
  );
};

export default Order;
