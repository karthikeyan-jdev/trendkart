import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAddToWishlist } from "./useAddToWishlist";
import { useRemoveWishlist } from "./useRemoveWishlist";
import { useWishlist } from "./useWishlist";
import { useProfile } from "./useProfile";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";
import type { Product } from "../types/productType";

export const useWishlistActions = (item?: Product) => {
  if (!item) {
    return {
      isWishlist: false,
      handleWishlist: () => {},
    };
  }
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data: userData } = useProfile();

  const { data: wishlistData } = useWishlist({
    enabled: !!userData,
  });

  const { mutate: postWish } = useAddToWishlist();
  const { mutate: removeWish } = useRemoveWishlist();

  const wishlistItem = wishlistData?.wishlist || [];

  const wishlistItems = useAppSelector((state) => state.wishlist.wishlistItems);

  // User Wishlist
  const isUserWishlist = wishlistItem.some(
    (wishlistItem: Product) => wishlistItem._id === item._id,
  );

  // Guest Wishlist
  const isGuestWishlist = wishlistItems.some(
    (wishlistItem) => wishlistItem._id === item._id,
  );

  const isWishlist = userData ? isUserWishlist : isGuestWishlist;

  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // Guest User
    if (!userData) {
      if (isGuestWishlist) {
        dispatch(removeFromWishlist(item._id));
      } else {
        dispatch(addToWishlist(item));
      }

      return;
    }

    // Logged In User
    if (isUserWishlist) {
      removeWish(item._id, {
        onSuccess: (data: { message: string }) => {
          queryClient.invalidateQueries({
            queryKey: ["wishlist"],
          });

          toast.success(data.message || "Removed from wishlist");
        },

        onError: (error: any) => {
          toast.error(
            error.response?.data?.error || "Failed to remove wishlist",
          );
        },
      });

      return;
    }

    postWish(item._id, {
      onSuccess: (data: { message: string }) => {
        queryClient.invalidateQueries({
          queryKey: ["wishlist"],
        });

        toast.success(data.message || "Added to wishlist ❤️");
      },

      onError: (error: any) => {
        toast.error(error.response?.data?.error || "Failed to update wishlist");
      },
    });
  };

  return {
    isWishlist,
    handleWishlist,
  };
};
