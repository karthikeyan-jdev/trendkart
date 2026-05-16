import { ProductModel } from "../models/product.js";
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

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await authModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check already exists
    const alreadyExists = user.cart.some(
      (item) => item.toString() === productId,
    );

    if (alreadyExists) {
      return res.status(400).json({ error: "Product already in cart" });
    }

    user.cart.unshift(productId);

    await user.save();

    res.status(200).json({ message: "Added to cart", cart: user.cart });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server error" });
  }
};

// ADD TO WISHLIST
export const addWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await authModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check already exists
    const alreadyExists = user.wishlist.some(
      (item) => item.toString() === productId,
    );

    if (alreadyExists) {
      return res.status(400).json({ error: "Product already in wishlist" });
    }

    user.wishlist.unshift(productId);

    await user.save();

    res
      .status(200)
      .json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server error" });
  }
};
