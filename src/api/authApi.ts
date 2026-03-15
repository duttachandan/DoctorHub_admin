import axios, { Axios, type AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AdminLoginResponse, AuthInterface } from "../@type/authInterface";

export const adminLogin = createAsyncThunk<
  AdminLoginResponse,
  AuthInterface,
  { rejectValue: string }
>(
  "auth/adminLogin",
  async ({ email, password }: AuthInterface, { rejectWithValue }) => {
    let reqPassword = password;
    try {
      const response: AxiosResponse = await axios.post<AdminLoginResponse>(
        `${import.meta.env.VITE_API_LINK}/adminlogin`,
        {
          email,
          reqPassword,
        },
      );
      localStorage.setItem("token", response?.data?.accessToken);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
      return rejectWithValue("unexpected error occured");
    }
  },
);

export const RefreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      let response: AxiosResponse = await axios.get(
        `${import.meta.env.VITE_API_LINK}/refreshtoken`,
        {
          withCredentials: true,
        },
      );
      console.log(response);
      localStorage.setItem("token", response?.data?.accessToken);
      return response?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  },
);


