import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../api/cartApi";

export const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCart,
  });
};
