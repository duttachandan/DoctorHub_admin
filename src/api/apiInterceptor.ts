import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_LINK,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    if (error.response?.status === 404 && !originalRequest._retry) {
      console.log("it is calling");
      originalRequest._retry = true;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_LINK}/refreshtoken`,
          { withCredentials: true },
        );
        const newAccessToken = res.data.accessToken;
        console.log(newAccessToken);
        localStorage.setItem("token", newAccessToken);
        originalRequest.headers.Authorization = newAccessToken;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
