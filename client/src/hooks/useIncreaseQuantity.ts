import { useMutation } from "@tanstack/react-query";
import { postCartIncreaseQuantity } from "../api/cartApi";

export const useIncreaseQuantity = () => {
  return useMutation({
    mutationFn: postCartIncreaseQuantity,
  });
};