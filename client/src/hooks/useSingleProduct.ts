import { useQuery } from "@tanstack/react-query";
import { fetchSingleProduct } from "../api/productApi";
import type { Product } from "../types/productType";

export const useSingleProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],

    queryFn: () => fetchSingleProduct(id),

    enabled: !!id,
  });
};
