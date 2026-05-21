import { useMutation } from "@tanstack/react-query";
import { removeFromWishlist } from "../api/whishlistApi";

export const useRemoveWishlist = () => {
  return useMutation({
    mutationFn: removeFromWishlist,
  });
};
