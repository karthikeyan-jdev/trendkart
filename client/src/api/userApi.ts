import { axiosInstance } from "../lib/axios";

export const getProfile = async () => {
  const res = await axiosInstance.get("/api/user/profile");

  return res.data;
};

export const addToCart = async (productId: string) => {
  const res = await axiosInstance.post("/api/user/cart", {
    productId,
  });

  return res.data;
};

export const addWishlist = async (productId: string) => {
  const res = await axiosInstance.post("/api/user/wishlist", {
    productId,
  });

  return res.data;
};