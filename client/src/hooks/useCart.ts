import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "../api/cartApi";

export const useCart = ({ enabled = true }: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartItems,
    enabled,
    retry: false,
  });
};
