import express from "express";
import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from "../controllers/userWishListController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get", protect, getWishlist);
router.post("/add", protect, addWishlist);
router.delete("/delete/:productId", protect, removeWishlist);

export default router;
