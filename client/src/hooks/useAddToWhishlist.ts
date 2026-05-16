import { useMutation } from "@tanstack/react-query";
import { addWishlist } from "../api/userApi";

export const useAddWishlist = () => {
  return useMutation({
    mutationFn: addWishlist,
  });
};