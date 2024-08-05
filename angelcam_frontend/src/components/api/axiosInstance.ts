import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to include the personal access token in the headers
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("personalAccessToken");
  if (token) {
    config.headers.Authorization = `PersonalAccessToken ${token}`;
  }
  return config;
});

export default axiosInstance;
