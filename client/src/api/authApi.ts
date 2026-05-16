import { axiosInstance } from "../lib/axios";
import type { LoginFormDataType } from "../schemas/login";
import type { SignupFormDataType } from "../schemas/signup";

export const postSignupUser = async (data: SignupFormDataType) => {
  const res = await axiosInstance.post("/api/auth/signup", data);

  return res.data;
};
export const postLoginUser = async (data: LoginFormDataType) => {
  const res = await axiosInstance.post("/api/auth/login", data);

  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.post("/api/auth/logout");

  return res.data;
};