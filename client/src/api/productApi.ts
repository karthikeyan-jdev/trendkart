import { axiosInstance } from "./axios";

export const fetchProducts = async ({ pageParam = 1 }) => {
  const res = await axiosInstance.get(
    `/api/products?page=${pageParam}&limit=8`,
  );
  return res.data;
};

export const fetchSingleProduct = async (id: string) => {
  const res = await axiosInstance.get(`/api/products/${id}`);
  return res.data;
};
