import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addWishlist, getWishlist, removeWishlist } from "../controllers/userWishListController.js";

const router = express.Router();

router.get("/wishlist", protect, getWishlist);
router.post("/wishlist", protect, addWishlist);
router.delete("/wishlist/:productId", protect, removeWishlist);

export default router;
