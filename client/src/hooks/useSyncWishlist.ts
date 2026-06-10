import { useMutation } from "@tanstack/react-query";
import { syncWishlist } from "../api/whishlistApi";

export const useSyncWishlist = () => {
  return useMutation({
    mutationFn: syncWishlist,
  });
};
