import { axiosInstance } from "../lib/axios";
import type { Product, ProductResponse } from "../types/productType";

export const fetchProducts = async ({ pageParam = 1 }:any) => {
  const res = await axiosInstance.get<ProductResponse>(
    `/api/products?page=${pageParam}&limit=8`,
  );
  return res.data;
};

export const fetchSingleProduct = async (id: string) => {
  const res = await axiosInstance.get<Product>(`/api/products/${id}`);
  return res.data;
};
