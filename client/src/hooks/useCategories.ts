import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/categoryApi";
import type { Category } from "../types/productType";

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });
};
