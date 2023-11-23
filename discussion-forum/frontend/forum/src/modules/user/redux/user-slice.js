import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post, get } from "../../../shared/services/api-client";

export const login = createAsyncThunk("/login", async (user) => {
  const env = await import.meta.env;
  const res = await post(`${env.VITE_APP_BACKEND_BASE_URL}/login`, user);

  localStorage.setItem("token", res.data.token);
  return res;
});
export const getUserById = createAsyncThunk("/get-user-by-id", async () => {
  const env = await import.meta.env;
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const res = await get(`${env.VITE_APP_BACKEND_BASE_URL}/user/me`, headers);
  return res;
});
export const register = createAsyncThunk("/register", async (user) => {
  const env = await import.meta.env;
  const res = await post(`${env.VITE_APP_BACKEND_BASE_URL}/register`, user);
  return res;
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: null,
    loading: false,
    loginStatus: "idle",
    registerStatus: "idle",
    err: null,
  },
  reducers: {
    resetRegisterStatus: (state) => {
      state.registerStatus = "idle";
    },
    resetLoginStatus: (state) => {
      state.loginStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.loginStatus = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.loading = false;
        state.loginStatus = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.err = "Incorrect email or Password";
        state.loading = false;
        state.loginStatus = "failed";
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.loading = false;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.err = "invalid token";
        state.loading = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.registerStatus = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registerStatus = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.err = action.payload;
        state.loading = false;
        state.registerStatus = "failed";
      });
  },
});
export const { resetRegisterStatus, resetLoginStatus } = userSlice.actions;
export default userSlice.reducer;
