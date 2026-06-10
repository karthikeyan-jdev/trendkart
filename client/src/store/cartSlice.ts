import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types/cartType";

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // GUEST ADD TO CART
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(
        (item) => item.product._id === action.payload.product._id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.unshift(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    // GUEST REMOVE
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id !== action.payload,
      );

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    // GUEST INCREASE
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (item) => item.product._id === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    // GUEST DECREASE
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (item) => item.product._id === action.payload,
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    // CLEAR BOTH RTK + LOCALSTORAGE
    clearCart: (state) => {
      state.cartItems = [];

      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
