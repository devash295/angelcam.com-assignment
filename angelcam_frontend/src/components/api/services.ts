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
    const response = await axiosInstance.get("/getSharedCameras");
    return response.data;
  },

  getCameraStreams: async (cameraId: string) => {
    const response = await axiosInstance.get(`/getCameraStreams/${cameraId}`);
    return response.data;
  },

  getCameraRecordings: async (cameraId: string) => {
    const response = await axiosInstance.get(
      `/getCameraRecordings/${cameraId}`
    );
    return response.data;
  },

  getRecordingStream: async (cameraId: string, start: string) => {
    const response = await axiosInstance.get(
      `/getRecordingStream/${cameraId}`,
      {
        params: {
          start: start,
        },
      }
    );
    return response.data;
  },
};

export default services;
