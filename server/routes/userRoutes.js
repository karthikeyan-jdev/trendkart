import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  addWishlist,
  getProfile,
} from "../controllers/userContoller.js";

const router = express.Router();

router.post("/cart", protect, addToCart);
router.post("/wishlist", protect, addWishlist);
router.get("/profile", protect, getProfile);

export default router;
