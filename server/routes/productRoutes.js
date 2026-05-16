import express from "express";
import {
  getProduct,
  getProductCategory,
  getSingleProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProduct);
router.get("/categories", getProductCategory);
router.get("/:id", getSingleProduct);

export default router;
