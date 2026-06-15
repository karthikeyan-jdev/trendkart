import toast from "react-hot-toast";
import type { Product } from "../types/productType";
import { useAddToCart } from "./useAddToCart";
import { useCart } from "./useCart";
import { useProfile } from "./useProfile";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../types/cartType";

export const useBuyNowActions = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: userData } = useProfile();
  const { data: cartItems = [] } = useCart({ enabled: !!userData });
  const { mutate: postCart } = useAddToCart();

  const handleBuyNow = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Product,
  ) => {
    e.stopPropagation();
    if (!userData) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    const existingItem = cartItems.some(
      (cartItem: CartItem) => cartItem.product?._id === item._id,
    );

    if (existingItem) {
      navigate("/buy");
      return;
    }

    postCart(item._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        navigate("/buy");
      },

      onError: (error: any) => {
        toast.error(error.response?.data?.error || "Failed to buy now");
      },
    });
  };
  return {
    handleBuyNow,
  };
};
