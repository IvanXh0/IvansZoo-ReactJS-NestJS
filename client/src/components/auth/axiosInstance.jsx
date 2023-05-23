
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 2000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
