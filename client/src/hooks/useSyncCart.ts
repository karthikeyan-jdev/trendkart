import { useMutation } from "@tanstack/react-query";
import { syncCart } from "../api/cartApi";

export const useSyncCart = () => {
  return useMutation({
    mutationFn: syncCart,
  });
};
