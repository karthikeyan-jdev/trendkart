
import { useMutation } from "@tanstack/react-query";
import { createPayment } from "../api/orderApi";

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: createPayment,
  });
};