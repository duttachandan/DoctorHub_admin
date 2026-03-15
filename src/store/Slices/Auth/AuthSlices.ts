import { createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "../../../@type/authInterface";

const initialState: InitialState = {
  status: "idle",
  data: [],
  error: null,
};

// Creating asyncThunk
import { adminLogin, RefreshToken } from "../../../api/authApi";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data.push(action.payload);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.data = [];
        state.status = "rejected";
        state.error = action.payload || "login failed";
      })
      .addCase(RefreshToken.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(RefreshToken.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data.push(action.payload);
      })
      .addCase(RefreshToken.rejected, (state, action) => {
        state.status = "rejected";
        state.data = [];
        state.error = (action.payload as string) || "Access Token Expired";
      });
  },
});

export default authSlice.reducer;
