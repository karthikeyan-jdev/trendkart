import { axiosInstance } from "../lib/axios";

export const fetchWishlistItems = async () => {
  const res = await axiosInstance.get("/api/user/wishlist");

  return res.data;
};

export const addToWishlist = async (productId: string) => {
  const res = await axiosInstance.post("/api/user/wishlist", {
    productId,
  });

  return res.data;
};

export const removeFromWishlist = async (productId: string) => {
  const res = await axiosInstance.delete(`/api/user/wishlist/${productId}`);
  return res.data;
};
