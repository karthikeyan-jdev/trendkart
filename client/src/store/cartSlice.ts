import { createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "../types/cartType";

// Define the initial state of the cart
interface CartState {
  cartItems: CartItem[];
}

// Load cart from localStorage
const getCart = localStorage.getItem("cart");

const initialState = { cartItems: getCart ? JSON.parse(getCart) : [] };

//save
const savedCart = (cart: CartItem[]) =>
  localStorage.setItem("cart", JSON.stringify(cart));

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState as CartState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cartItems.find(
        (item) => item._id === action.payload._id,
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.unshift({
          ...action.payload,
          quantity: 1,
        });
      }
      savedCart(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
      savedCart(state.cartItems);
    },

    increaseQuantity: (state, action) => {
      const product = state.cartItems.find(
        (item) => item._id === action.payload,
      );
      if (product) {
        product.quantity += 1;
      }
      savedCart(state.cartItems);
    },

    decreaseQuantity: (state, action) => {
      const product = state.cartItems.find(
        (item) => item._id === action.payload,
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      savedCart(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      savedCart([]);
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
