import { axiosInstance } from "../lib/axios";
import type {
  CreatePaymentPayload,
  CreatePaymentResponse,
} from "../types/orderType";

export const createPayment = async (
  orderData: CreatePaymentPayload,
): Promise<CreatePaymentResponse> => {
  const res = await axiosInstance.post("/api/payment", orderData);
  return res.data;
};
