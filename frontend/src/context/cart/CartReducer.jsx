import * as types from '../Types';

const CartReducer = (cart, action) => {
  switch (action.type) {
    case types.CREATE_CART_SUCCESS:
      const existingItem = cart.find((x) => x._id === action.payload._id);
      if (existingItem) {
        return cart.map((x) =>
          x._id === existingItem._id ? action.payload : x
        );
      } else {
        return [...cart, action.payload];
      }

    case types.REMOVE_CART_SUCCESS:
      return cart.filter((product) => product._id !== action.payload);

    case types.CLEAR_CART:
      return (cart = []);

    default:
      return cart;
  }
};

export default CartReducer;
