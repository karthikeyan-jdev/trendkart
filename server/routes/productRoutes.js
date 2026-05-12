import express from "express";
import { getProduct, getSingleProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProduct);
router.get("/:id", getSingleProduct);

export default router;
