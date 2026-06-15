import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useProfile } from "./useProfile";
import { useWishlist } from "./useWishlist";
import { useRemoveWishlist } from "./useRemoveWishlist";
import { removeFromWishlist } from "../store/wishlistSlice";

export const useWishlistPage = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data: userData } = useProfile();

  const { data: wishlistData } = useWishlist({
    enabled: !!userData,
  });

  const { mutate: removeWish } = useRemoveWishlist();

  const wishlistItem = wishlistData?.wishlist || [];

  const guestWishlistItems = useAppSelector(
    (state) => state.wishlist.wishlistItems,
  );

  //itemto display
  const WishlistItemsToDisplay = userData ? wishlistItem : guestWishlistItems;

  //remove wishlist
  const handleRemoveWishlist = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: string,
  ) => {
    e.stopPropagation();

    if (!userData) {
      dispatch(removeFromWishlist(productId));
      toast.success("Removed from wishlist");
      return;
    }
    removeWish(productId, {
      onSuccess: (data: { message: string }) => {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        toast.success(data.message || "Removed from wishlist");
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.error || "Failed to remove from wishlist",
        );
      },
    });
  };
  return { WishlistItemsToDisplay, handleRemoveWishlist };
};
