import { useMutation } from "@tanstack/react-query";
import { postCartDecreaseQuantity } from "../api/cartApi";

export const useDecreaseQuantity = () => {
  return useMutation({
    mutationFn: postCartDecreaseQuantity,
  });
};