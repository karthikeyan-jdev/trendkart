import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types/productType";

// Define the initial state of wishlist
interface WishlistState {
  wishlistItems: Product[];
}

// Load wishlist from localStorage
const getWishlist = localStorage.getItem("wishlist");

const initialState = {
  wishlistItems: getWishlist ? JSON.parse(getWishlist) : [],
};

// Save wishlist
const savedWishlist = (wishlist: Product[]) =>
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: initialState as WishlistState,

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

    // Toggle Wishlist
    toggleWishlist: (state, action) => {
      const existingProduct = state.wishlistItems.find(
        (item) => item._id === action.payload._id,
      );

      if (existingProduct) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item._id !== action.payload._id,
        );
      } else {
        state.wishlistItems.push(action.payload);
      }

      savedWishlist(state.wishlistItems);
    },

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
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
