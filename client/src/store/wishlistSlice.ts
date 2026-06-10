import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types/productType";

// Define the initial state of wishlist
interface WishlistState {
  wishlistItems: Product[];
}

// Load wishlist from localStorage
const initialState: WishlistState = {
  wishlistItems: JSON.parse(localStorage.getItem("wishlist") || "[]"),
};

// Save wishlist
const savedWishlist = (wishlist: Product[]) =>
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add To Wishlist
    addToWishlist: (state, action) => {
      const existingProduct = state.wishlistItems.find(
        (item) => item._id === action.payload._id,
      );

      if (!existingProduct) {
        state.wishlistItems.unshift(action.payload);
      }

      savedWishlist(state.wishlistItems);
    },

    // Remove From Wishlist
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload,
      );

      savedWishlist(state.wishlistItems);
    },

    // // Toggle Wishlist
    // toggleWishlist: (state, action) => {
    //   const existingProduct = state.wishlistItems.find(
    //     (item) => item._id === action.payload._id,
    //   );

    //   if (existingProduct) {
    //     state.wishlistItems = state.wishlistItems.filter(
    //       (item) => item._id !== action.payload._id,
    //     );
    //   } else {
    //     state.wishlistItems.push(action.payload);
    //   }

    //   savedWishlist(state.wishlistItems);
    // },

    // Clear Wishlist
    clearWishlist: (state) => {
      state.wishlistItems = [];
      savedWishlist([]);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  // toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
