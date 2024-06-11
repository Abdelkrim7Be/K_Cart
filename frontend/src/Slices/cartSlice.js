import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../Utilities/cartUtilities";

// Check if there is alrady something in the cart
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Checking if the item is already in the Cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        //   State is IMMUTABLE
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state); 
    },
  },
});

// Export it as an action
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
