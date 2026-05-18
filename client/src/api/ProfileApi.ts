import { axiosInstance } from "../lib/axios";

export const getProfile = async () => {
  const res = await axiosInstance.get("/api/user/profile");

  return res.data;
};
