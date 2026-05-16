import { useMutation } from "@tanstack/react-query";
import { postLoginUser } from "../api/authApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: postLoginUser,
  });
};