import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productApi";
import type { ProductResponse } from "../types/productType";

export const useProducts = () => {
  return useInfiniteQuery<ProductResponse>({
    queryKey: ["products"],
    queryFn: fetchProducts,

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        return lastPage.currentPage + 1;
      }

      return undefined;
    },
  });
};