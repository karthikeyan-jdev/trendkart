import { axiosInstance } from "../lib/axios";
import type { Category } from "../types/productCategoriesType";

export const fetchCategories = async () => {
  const res = await axiosInstance.get<Category[]>("/api/products/categories");
  return res.data;
};
