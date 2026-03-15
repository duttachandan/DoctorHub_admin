import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/Auth/AuthSlices";
import doctorReducer from "./Slices/doctor/doctorSlices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
