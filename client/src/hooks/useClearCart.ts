import { useMutation } from "@tanstack/react-query";
import { clearCartApi  } from "../api/cartApi";

export const useClearCart = () => {
  return useMutation({
    mutationFn: clearCartApi ,
  });
};