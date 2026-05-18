import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types/cartType";

interface BackendCartItem {
  product: CartItem;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // SET CART FROM BACKEND (AFTER LOGIN)
    setCart: (state, action: PayloadAction<BackendCartItem[]>) => {
      state.cartItems = action.payload.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));
    },

    // ADD TO CART (LOCAL UI UPDATE)
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;

      const existingProduct = state.cartItems.find(
        (item) => item._id === product._id,
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.unshift({
          ...product,
          quantity: 1,
        });
      }
    },

    // REMOVE FROM CART
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
    },

    // INCREASE QUANTITY
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cartItems.find(
        (item) => item._id === action.payload,
      );

      if (product) {
        product.quantity += 1;
      }
    },

    // DECREASE QUANTITY
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cartItems.find(
        (item) => item._id === action.payload,
      );

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    // CLEAR CART
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;