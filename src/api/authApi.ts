import axios, { type AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AdminLoginResponse, AuthInterface } from "../@type/authInterface";

export const adminLogin = createAsyncThunk<
  AdminLoginResponse,
  AuthInterface,
  { rejectValue: string }
>(
  "auth/adming",
  async ({ email, password }: AuthInterface, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.post<AdminLoginResponse>(
        `${import.meta.env.VITE_API_LINK}/generateotp`,
        {
          email,
          password,
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
        return rejectWithValue(error.message || error.response?.data?.message);
      }
      console.log(error);
      return rejectWithValue("unexpected error occured");
    }
  },
);
