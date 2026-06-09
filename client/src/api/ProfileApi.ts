import { axiosInstance } from "../lib/axios";

export const getProfile = async () => {
  try {
    const res = await axiosInstance.get("/api/profile/get");

    return res.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
