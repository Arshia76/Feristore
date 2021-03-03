import { useReducer, useEffect } from 'react';
import * as types from '../Types';
import CartReducer from './CartReducer';
import CartContext from './CartContext';

const CartState = (props) => {
  const [cart, dispatch] = useReducer(CartReducer, [], () => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addCart = (product, count) => {
    dispatch({
      type: types.CREATE_CART_SUCCESS,
      payload: {
        name: product.name,
        price: product.price,
        description: product.description,
        reviews: product.reviews,
        countInStock: product.countInStock,
        image: product.image,
        _id: product._id,
        category: product.category,
        count,
      },
    });
  };

  const removeCart = (id) => {
    dispatch({
      type: types.REMOVE_CART_SUCCESS,
      payload: id,
    });
  };

  const clearCart = () => {
    dispatch({
      type: types.CLEAR_CART,
    });
  };

  return (
    <CartContext.Provider
      value={{ cart: cart, addCart, removeCart, clearCart }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
