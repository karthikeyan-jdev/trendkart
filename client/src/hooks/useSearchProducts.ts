import { useQuery } from "@tanstack/react-query";
import { fetchProductsBySearch } from "../api/productApi";

const useSearchProducts = (search: string) => {
  return useQuery({
    queryKey: ["search-products", search],
    queryFn: () => fetchProductsBySearch(search),
    enabled: !!search,
  });
};

export default useSearchProducts;
