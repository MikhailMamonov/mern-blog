import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import commentSlice from './features/commentSlice';
import postSlice from './features/postSlice';

export default configureStore({
  reducer: { auth: authSlice, post: postSlice, comment: commentSlice },
});
