import { useMutation } from "@tanstack/react-query";
import { postSignupUser } from "../api/authApi";

export const useSignup = () => {
  return useMutation({
    mutationFn: postSignupUser,
  });
};