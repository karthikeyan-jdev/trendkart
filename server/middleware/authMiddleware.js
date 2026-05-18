import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Not authorized" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};


// import jwt from "jsonwebtoken";
// import { authModel } from "../models/auth.js";

// export const protect = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ error: "Not authorized, no token" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 🔥 IMPORTANT: verify user exists in DB
//     const user = await authModel.findById(decoded.id);

//     if (!user) {
//       return res.status(401).json({ error: "User not found" });
//     }

//     req.user = user; // full user object (better than decoded)
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// };