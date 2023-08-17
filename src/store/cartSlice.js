import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const existingItem = state.cart.find(
        ({ pizzaId }) => pizzaId === payload.pizzaId
      );

      if (existingItem)
        cartSlice.caseReducers.increaseItemQuantity(state, {
          payload: payload.pizzaId
        });
      else state.cart.push(payload);
    },
    deleteItem(state, { payload }) {
      state.cart = state.cart.filter(({ pizzaId }) => pizzaId !== payload);
    },
    increaseItemQuantity(state, { payload }) {
      const existingIndex = state.cart.findIndex(
        ({ pizzaId }) => pizzaId === payload
      );

      state.cart[existingIndex].quantity += 1;
      state.cart[existingIndex].totalPrice =
        state.cart[existingIndex].quantity *
        state.cart[existingIndex].unitPrice;
    },
    decreaseItemQuantity(state, { payload }) {
      const existingItem = state.cart.find(
        ({ pizzaId }) => pizzaId === payload
      );

      if (existingItem.quantity === 1)
        cartSlice.caseReducers.deleteItem(state, { payload });

      existingItem.quantity -= 1;
      existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    }
  }
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = ({ cart }) => cart.cart;

export const getTotalCartQuantity = createDraftSafeSelector(getCart, (cart) =>
  cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);

export const getTotalCartPrice = createDraftSafeSelector(getCart, (cart) =>
  cart.reduce((acc, cartItem) => acc + cartItem.totalPrice, 0)
);

export const getCurrentQuantityById = (id) =>
  createDraftSafeSelector(
    getCart,
    (cart) => cart.find(({ pizzaId }) => pizzaId === id)?.quantity ?? 0
  );
