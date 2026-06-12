import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useProfile } from "./useProfile";
import { useCart } from "./useCart";
import type { Product } from "../types/productType";
import { useAddToCart } from "./useAddToCart";
import toast from "react-hot-toast";
import type { CartItem } from "../types/cartType";
import { addToCart } from "../store/cartSlice";
import { useNavigate } from "react-router";

export const useCartActions = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: userData } = useProfile();
  const { mutate: postCart } = useAddToCart();

  const { data: cartItems = [] } = useCart({
    enabled: !!userData,
  });
  const guestItems = useAppSelector((state) => state.cart.cartItems);
  const cartDisplayItems = userData ? cartItems : guestItems;

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Product,
  ) => {
    e.stopPropagation();

    const existingItem = cartDisplayItems.some(
      (cartItem: CartItem) => cartItem.product?._id === item._id,
    );

    if (existingItem) {
      navigate("/cart");
      return;
    }

    // Guest User
    if (!userData) {
      dispatch(
        addToCart({
          _id: crypto.randomUUID(),
          product: item,
          quantity: 1,
        }),
      );

      toast.success("Added to cart 🛒");
      return;
    }

    // Logged In User
    postCart(item._id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });

        toast.success(data.message);
      },

      onError: (error: any) => {
        toast.error(error.response?.data?.error || "Failed to add to cart");
      },
    });
  };
  return {
    handleAddToCart,cartItems,cartDisplayItems
  };
};
