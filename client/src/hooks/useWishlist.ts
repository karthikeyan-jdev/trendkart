import { useQuery } from "@tanstack/react-query";
import { fetchWishlistItems } from "../api/whishlistApi";

export const useWishlist = ({ enabled = true }: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlistItems,
    retry: false,
    enabled,
  });
};
