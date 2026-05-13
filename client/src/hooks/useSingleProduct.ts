import { useQuery } from "@tanstack/react-query";
import { fetchSingleProduct } from "../api/productApi";

export const useSingleProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],

    queryFn: () => fetchSingleProduct(id),

    enabled: !!id,
  });
};
