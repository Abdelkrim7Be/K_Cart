/**Simply using this slice to set user credentials to local storage during auth and , clear it from local storage during
 * logout
 */
import { createSlice } from "@reduxjs/toolkit";

// Checking if there's already userInfo in localStorage or not
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // When we hit our backend through our userApi slice , so as for our userInfo , we are gonna send
      // userInfo as a payload in the action; we are setting state.userInfo to that payload
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
