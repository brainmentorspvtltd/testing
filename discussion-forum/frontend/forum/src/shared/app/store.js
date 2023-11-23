import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../../modules/user/redux/user-slice";
import postSlice from "../../modules/post/redux/post-slice";
import commentSlice from "../../modules/comment/redux/comment-slice";

const rootReducer = combineReducers({
  user: userSlice,
  post: postSlice,
  comment: commentSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
