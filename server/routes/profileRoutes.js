import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/userProfileController.js";

const router = express.Router();

router.get("/get", protect, getProfile);

export default router;
