import { createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "../../../@type/authInterface";

import { doctorCall, addDoctor } from "../../../api/doctorApi";

const initialState: InitialState = {
  status: "idle",
  data: [],
  error: "",
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(doctorCall.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(doctorCall.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data.push(action.payload);
      })
      .addCase(doctorCall.rejected, (state, action) => {
        state.status = "rejected";
        state.data = [];
        state.error = action.payload as string;
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      });
  },
});

export default doctorSlice.reducer;
