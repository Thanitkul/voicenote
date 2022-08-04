import { configureStore } from "@reduxjs/toolkit";
import { authActions } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authActions.reducer,
  },
});

export default store;
