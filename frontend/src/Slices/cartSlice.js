import { createSlice } from "@reduxjs/toolkit";

// Check if there is alrady something in the cart
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

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

      // Calculate item price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      //  calculate shipping price (if order is over 100$ donc free , else 10$ shipping)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Calculate tax price (10% tax)
      state.taxPrice = addDecimals(Number((0.1 * state.itemsPrice).toFixed(2)));

      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      //   Adding all of this to the local storage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

// Export it as an action
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
