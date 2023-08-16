import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import cartSlice from "./cartSlice.js";

const store = configureStore({
  reducer: { user: userSlice, cart: cartSlice },
});

export default store;
