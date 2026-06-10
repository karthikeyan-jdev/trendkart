import { axiosInstance } from "../lib/axios";

export const fetchWishlistItems = async () => {
  const res = await axiosInstance.get("/api/wishlist/get");

  return res.data;
};

export const addToWishlist = async (productId: string) => {
  const res = await axiosInstance.post("/api/wishlist/add", {
    productId,
  });

  return res.data;
};

export const removeFromWishlist = async (productId: string) => {
  const res = await axiosInstance.delete(`/api/wishlist/delete/${productId}`);
  return res.data;
};

export const syncWishlist = async (items: any) => {
  const res = await axiosInstance.post("/api/wishlist/sync", items);
  return res.data;
};
