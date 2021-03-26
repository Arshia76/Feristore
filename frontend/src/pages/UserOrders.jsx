import React, { useContext, useEffect } from 'react';
import UserTable from '../components/UserTable';
import OrderContext from '../context/orders/OrderContext';

const UserOrders = ({ match }) => {
  const orderContext = useContext(OrderContext);

  useEffect(() => {
    orderContext.getUserOrders(match.params.id);
    //eslint-disable-next-line
  }, [match.params.id]);
  return <UserTable orders={orderContext.orders} />;
};

export default UserOrders;
