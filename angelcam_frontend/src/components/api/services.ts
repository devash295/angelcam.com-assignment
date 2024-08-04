import axiosInstance from "./axiosInstance";

const services = {
  login: async (token: string) => {
    const response = await axiosInstance.post("/auth/login", { token });
    return response.data;
  },

  getSharedCameras: async () => {
    const response = await axiosInstance.get("/shared-cameras");
    return response.data;
  },
};

export default services;
