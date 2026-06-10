import { authModel } from "../models/auth.js";
import { ProductModel } from "../models/product.js";

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

//GET WISHLIST
export const getWishlist = async (req, res) => {
  try {
    const user = await authModel.findById(req.user.id).populate("wishlist");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
};

//REMOVE WISHLIST
export const removeWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await authModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== productId,
    );

    await user.save();

    res.status(200).json({
      message: "Removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
};

//sync wishlist
export const syncWishlist = async (req, res) => {
  try {
    const { items } = req.body;

    const user = await authModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    for (const item of items) {
      const existingItem = user.wishlist.find(
        (wishItem) => wishItem?.toString() === item,
      );

      if (!existingItem) {
        user.wishlist.unshift(item);
      }
    }

    await user.save();

    res.status(200).json({
      message: "Wishlist synced",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
};
