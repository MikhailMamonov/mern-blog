import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  comments: [],
  loading: false,
};

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ comment, postId }) => {
    try {
      const { data } = await axios.post(`/comments`, { comment, postId });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCommentsByPost = createAsyncThunk(
  'comment/getCommentsByPost',
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: {
    //Create comment
    [createComment.pending]: (state) => {
      state.loading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    },
    [createComment.rejected]: (state) => {
      state.loading = false;
    },
    //Get commentsby post
    [getCommentsByPost.pending]: (state) => {
      state.loading = true;
    },
    [getCommentsByPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [getCommentsByPost.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default commentSlice.reducer;
