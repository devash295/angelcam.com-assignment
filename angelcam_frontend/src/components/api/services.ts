import axios from "axios";
import axiosInstance from "./axiosInstance";

const services = {
  login: async (token: string) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
      { token: token }
    );
    return response.data;
  },

  getSharedCameras: async () => {
    const response = await axiosInstance.get("/shared-cameras");
    return response.data;
  },
};

export default services;
