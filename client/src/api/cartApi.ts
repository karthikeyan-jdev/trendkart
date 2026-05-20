import { axiosInstance } from "../lib/axios";

// GET CART ITEMS
export const fetchCartItems = async () => {
  const res = await axiosInstance.get("/api/user/cart");
  return res.data.cart;
};

// ADD TO CART
export const addToCart = async (productId: string) => {
  const res = await axiosInstance.post("/api/user/cart", {
    productId,
  });

  return res.data;
};

// INCREASE QUANTITY
export const postCartIncreaseQuantity = async (
  productId: string,
) => {
  const res = await axiosInstance.patch(
    `/api/user/cart/increase/${productId}`,
  );

  return res.data;
};

// DECREASE QUANTITY
export const postCartDecreaseQuantity = async (
  productId: string,
) => {
  const res = await axiosInstance.patch(
    `/api/user/cart/decrease/${productId}`,
  );

  return res.data;
};

// REMOVE FROM CART
export const deleteCartItem = async (productId: string) => {
  const res = await axiosInstance.delete(
    `/api/user/cart/${productId}`,
  );

  return res.data;
};

// CLEAR CART
export const clearCartApi = async () => {
  const res = await axiosInstance.delete("/api/user/cart");

  return res.data;
};