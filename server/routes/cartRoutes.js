import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  addToCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/userCartController.js";

const router = express.Router();

router.get("/cart", protect, getCart);
router.post("/cart", protect, addToCart);
router.patch("/cart/increase/:productId", protect, increaseQuantity);
router.patch("/cart/decrease/:productId", protect, decreaseQuantity);
router.delete("/cart/:productId", protect, removeFromCart);
router.delete("/cart", protect, clearCart);

export default router;
