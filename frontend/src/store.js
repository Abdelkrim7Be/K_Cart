// The entry point of redux
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../src/Slices/apiSlice";
import cartSliceReducer from "./Slices/cartSlice";
import authSliceReducer from "./Slices/authSlice"; 

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
