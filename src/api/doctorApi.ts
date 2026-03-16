import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { type AxiosResponse } from "axios";
import { api } from "./apiInterceptor";

export const doctorCall = createAsyncThunk(
  "doctor/allDcotor",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.get(
        `${import.meta.env.VITE_API_LINK}/doctors`,
      );
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
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);
      const createDoctor = await api.post(`/createdoctors`, formData);
      console.log(createDoctor);
      return createDoctor?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
      return rejectWithValue("something went wrong");
    }
  },
);
