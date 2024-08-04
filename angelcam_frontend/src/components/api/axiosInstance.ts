import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the personal access token in the headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("personalAccessToken");
  if (token) {
    config.headers.Authorization = `PersonalAccessToken ${token}`;
  }
  return config;
});

export default axiosInstance;
