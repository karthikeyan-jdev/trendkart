import { axiosInstance } from "../lib/axios";

export const addWishlist = async (productId: string) => {
  const res = await axiosInstance.post("/api/user/wishlist", {
    productId,
  });

  return res.data;
};