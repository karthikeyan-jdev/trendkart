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
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { data: userData } = useProfile();
  const { data: wishlistData } = useWishlist({
    enabled: !!userData,
  });
  const { mutate: postWish } = useAddToWishlist();
  const { mutate: removeWish } = useRemoveWishlist();
  const wishlistItem = wishlistData?.wishlist || [];
  const guestWishlistItems = useAppSelector(
    (state) => state.wishlist.wishlistItems,
  );

  // User Wishlist
  const isUserWishlist = item
    ? wishlistItem.some(
        (wishlistItem: Product) => wishlistItem._id === item._id,
      )
    : false;

  // Guest Wishlist
  const isGuestWishlist = item
    ? guestWishlistItems.some((wishlistItem) => wishlistItem._id === item._id)
    : false;

  // Final Wishlist Check
  const isWishlist = item
    ? userData
      ? isUserWishlist
      : isGuestWishlist
    : false;

  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!item) return;
    // Guest User
    if (!userData) {
      if (isGuestWishlist) {
        dispatch(removeFromWishlist(item._id));
        toast.success("Removed from wishlist");
      } else {
        dispatch(addToWishlist(item));
        toast.success("Added to wishlist ❤️");
      }
      return;
    }

    // when userData true make API call
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
