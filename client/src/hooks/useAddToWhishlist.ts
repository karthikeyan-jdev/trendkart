import { useMutation } from "@tanstack/react-query";
import { addToWishlist } from "../api/whishlistApi";

export const useAddWishlist = () => {
  return useMutation({
    mutationFn: addToWishlist,
  });
};
