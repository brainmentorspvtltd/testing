import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "../../../shared/services/api-client";
export const createPost = createAsyncThunk(
  "/create-post",
  async (post_body) => {
    const env = await import.meta.env;
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await post(
      `${env.VITE_APP_BACKEND_BASE_URL}/create-post`,
      post_body,
      headers
    );
    return res;
  }
);
export const getAllPost = createAsyncThunk("/get-all-post", async () => {
  const env = await import.meta.env;
  const res = await get(`${env.VITE_APP_BACKEND_BASE_URL}/get-all-post`);
  return res;
});

const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    posts: null,
    loading: false,
    err: null,
    createPostStatus: "idle",
  },
  reducers: {
    resestCreatePostStatus: (state) => {
      state.createPostStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.createPostStatus = "pending";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.createPostStatus = "succeeded";
      })

      .addCase(createPost.rejected, (state, action) => {
        state.err = "error in post creating";
        state.loading = false;
        state.createPostStatus = "failed";
      })
      .addCase(getAllPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data.posts;
      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.err = action.payload;
        state.loading = false;
      });
  },
});
export const { resestCreatePostStatus } = postSlice.actions;
export default postSlice.reducer;
