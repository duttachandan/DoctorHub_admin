import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { type AxiosResponse } from "axios";

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

export const getDoctor = createAsyncThunk(
  "doctor/getDoctor",
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

export const addDoctor = createAsyncThunk(
  "doctor/createDoctor",
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);
      const createDoctor = await axios.post(
        `${import.meta.env.VITE_API_LINK}/createdoctors`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      console.log(createDoctor.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
      }
      return error;
    }
  },
);


