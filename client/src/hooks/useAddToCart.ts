import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../api/userApi";

export const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCart,
  });
};