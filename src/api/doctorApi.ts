import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { Axios, type AxiosResponse } from "axios";

export const doctorCall = createAsyncThunk(
  "doctor/allDcotor",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.get(
        `${import.meta.env.VITE_API_LINK}`,
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
      return error;
    }
  },
);

export const addDoctor = createAsyncThunk(
  "doctor/createDoctor",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.get(
        `${import.meta.env.VITE_API_LINK}/createdoctors`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error?.response?.data?.message;
      }
      return error;
    }
  },
);
