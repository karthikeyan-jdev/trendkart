import express from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// router.get("/me", protect, (req, res) => {
//   res.json(req.user);
// });

export default router;
