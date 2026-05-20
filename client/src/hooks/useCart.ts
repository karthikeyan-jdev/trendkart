import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "../api/cartApi";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartItems,
  });
};