import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../api/authApi";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};