import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  addToCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  syncCart,
} from "../controllers/userCartController.js";

const router = express.Router();

router.get("/get", protect, getCart);
router.post("/add", protect, addToCart);
router.patch("/increase/:productId", protect, increaseQuantity);
router.patch("/decrease/:productId", protect, decreaseQuantity);
router.delete("/remove/:productId", protect, removeFromCart);
router.delete("/clear", protect, clearCart);

router.post("/sync", protect, syncCart);

export default router;
