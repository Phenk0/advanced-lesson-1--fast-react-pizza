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

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.quantity * existingItem.unitPrice;
      } else state.cart.push(payload);
    },
    deleteItem(state, { payload }) {
      state.cart = state.cart.filter(({ pizzaId }) => pizzaId !== payload);
    },
    decreaseItemQuantity(state, { payload }) {
      const existingItem = state.cart.find(
        ({ pizzaId }) => pizzaId === payload
      );

      if (existingItem.quantity === 1)
        state.cart = state.cart.filter((item) => item !== existingItem);
      existingItem.quantity -= 1;
      existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    }
  }
});

export const { addItem, deleteItem, decreaseItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQuantity = createDraftSafeSelector(
  ({ cart }) => cart.cart,
  (cart) => cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);

export const getTotalCartPrice = createDraftSafeSelector(
  ({ cart }) => cart.cart,
  (cart) => cart.reduce((acc, cartItem) => acc + cartItem.totalPrice, 0)
);
