import express from "express";
import {
  getProduct,
  getProductCategory,
  getSingleProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/", protect, getProduct);
// router.get("/categories", protect, getProductCategory);
// router.get("/:id", protect, getSingleProduct);

router.get("/", getProduct);
router.get("/categories", getProductCategory);
router.get("/:id", getSingleProduct);

export default router;
