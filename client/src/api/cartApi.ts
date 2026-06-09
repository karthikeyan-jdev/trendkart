import { axiosInstance } from "../lib/axios";

// SYNC CART
export const syncCart = async (items: any) => {
  const { data } = await axiosInstance.post("/api/cart/sync", items);
  return data;
};

// GET CART ITEMS
export const fetchCartItems = async () => {
  const res = await axiosInstance.get("/api/cart/get");
  return res.data.cart;
};

// ADD TO CART
export const addToCart = async (productId: string) => {
  const res = await axiosInstance.post("/api/cart/add", {
    productId,
  });

  return res.data;
};

// INCREASE QUANTITY
export const postCartIncreaseQuantity = async (productId: string) => {
  const res = await axiosInstance.patch(`/api/cart/increase/${productId}`);

  return res.data;
};

// DECREASE QUANTITY
export const postCartDecreaseQuantity = async (productId: string) => {
  const res = await axiosInstance.patch(`/api/cart/decrease/${productId}`);

  return res.data;
};

// REMOVE FROM CART
export const deleteCartItem = async (productId: string) => {
  const res = await axiosInstance.delete(`/api/cart/remove/${productId}`);

  return res.data;
};

// CLEAR CART
export const clearCartApi = async () => {
  const res = await axiosInstance.delete("/api/cart/clear");

  return res.data;
};
