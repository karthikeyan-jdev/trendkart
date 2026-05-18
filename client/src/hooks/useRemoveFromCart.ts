import { useMutation } from "@tanstack/react-query";
import { deleteCartItem } from "../api/cartApi";

export const useRemoveFromCart = () => {
  return useMutation({
    mutationFn: deleteCartItem,
  });
};
