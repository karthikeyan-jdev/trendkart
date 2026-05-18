import { authModel } from "../models/auth.js";


// GET PROFILE

export const getProfile = async (req, res) => {
  try {
    const user = await authModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
