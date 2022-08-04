import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  name: "",
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;

      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
