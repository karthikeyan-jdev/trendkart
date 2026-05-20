import { useMutation } from "@tanstack/react-query";
import { addToWishlist } from "../api/whishlistApi";

export const useAddToWishlist = () => {
  return useMutation({
    mutationFn: addToWishlist,
  });
};
