import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "../../../shared/services/api-client";
export const commentOnPost = createAsyncThunk(
  "/comment-on-post",
  async (comment) => {
    const env = await import.meta.env;
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await post(
      `${env.VITE_APP_BACKEND_BASE_URL}/comment-on-post`,
      comment,
      headers
    );
    return res;
  }
);
export const getAllComments = createAsyncThunk(
  "/get-all-comments",
  async (slug) => {
    const env = await import.meta.env;

    const res = await get(
      `${env.VITE_APP_BACKEND_BASE_URL}/get-all-comments?slug=${slug}`
    );
    return res;
  }
);

const commentSlice = createSlice({
  name: "commentSlice",
  initialState: {
    comments: null,
    loading: false,
    err: null,
    commentOnPostStatus: "idle",
  },
  reducers: {
    resetCommentOnPostStatus: (state) => {
      state.commentOnPostStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(commentOnPost.pending, (state) => {
        state.loading = true;
        state.commentOnPostStatus = "pending";
      })
      .addCase(commentOnPost.fulfilled, (state, action) => {
        state.loading = false;
        state.commentOnPostStatus = "succeeded";
      })
      .addCase(commentOnPost.rejected, (state, action) => {
        state.err = "error in  comment";
        state.loading = false;
        state.commentOnPostStatus = "failed";
      })
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data.commentts;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.err = action.payload;
        state.loading = false;
      });
  },
});
export const { resetCommentOnPostStatus } = commentSlice.actions;
export default commentSlice.reducer;
