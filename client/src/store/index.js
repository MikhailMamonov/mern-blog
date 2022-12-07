import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import postSlice from "./features/postSlice";

export default configureStore({
  reducer: { auth: authSlice, post: postSlice },
});
