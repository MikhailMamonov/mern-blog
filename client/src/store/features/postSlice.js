import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
};

export const createPost = createAsyncThunk(
  'post/createPost',
  async (params) => {
    try {
      const { data } = await axios.post('/posts', params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
  try {
    const { data } = await axios.get('/posts');
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getMyPosts = createAsyncThunk('post/getMyPosts', async () => {
  try {
    const { data } = await axios.get('/posts/user/me');
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removePost = createAsyncThunk('post/removePost', async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (updatedPost) => {
    try {
      const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const likePost = createAsyncThunk('post/likePost', async (likedPost) => {
  try {
    const { data } = await axios.post(`/posts/like/${likedPost}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    //Create post
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state) => {
      state.loading = false;
    },
    //Get all posts
    [getAllPosts.pending]: (state) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
    },
    [getAllPosts.rejected]: (state) => {
      state.loading = false;
    },
    //Get all posts
    [getMyPosts.pending]: (state) => {
      state.loading = true;
    },
    [getMyPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      console.log(state.posts);
    },
    [getMyPosts.rejected]: (state) => {
      state.loading = false;
    },
    //Remove post
    [removePost.pending]: (state) => {
      state.loading = true;
    },
    [removePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
    [removePost.rejected]: (state) => {
      state.loading = false;
    },
    //Update post
    [updatePost.pending]: (state) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts[index] = action.payload;
    },
    [updatePost.rejected]: (state) => {
      state.loading = false;
    },
    //Like post
    [likePost.pending]: (state) => {
      state.loading = true;
    },
    [likePost.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts[index] = action.payload;
    },
    [likePost.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
