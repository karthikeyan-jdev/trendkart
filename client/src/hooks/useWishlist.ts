import { useQuery } from "@tanstack/react-query";
import { fetchWishlistItems } from "../api/whishlistApi";

export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlistItems,
  });
};