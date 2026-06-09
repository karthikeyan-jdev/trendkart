import { authModel } from "../models/auth.js";
import { ProductModel } from "../models/product.js";

export const syncCart = async (req, res) => {
  try {
    const { items } = req.body;

    const user = await authModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    for (const item of items) {
      const existingItem = user.cart.find(
        (cartItem) => cartItem.product?.toString() === item.productId,
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        user.cart.unshift({
          product: item.productId,
          quantity: item.quantity,
        });
      }
    }

    await user.save();

    res.status(200).json({
      message: "Cart synced",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
};

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
      (item) => item.product?.toString() === productId,
    );
    console.log(user.cart);

    if (alreadyExists) {
      return res.status(400).json({
        error: "Product already in cart",
      });
    }

    user.cart.unshift({ product: productId });

    await user.save();

    const updatedUser = await authModel
      .findById(req.user.id)
      .populate("cart.product");

    res.status(200).json({
      message: "Added to cart",
      cart: updatedUser.cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
};

// GET CART
export const getCart = async (req, res) => {
  try {
    const user = await authModel.findById(req.user.id).populate("cart.product");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      cart: user.cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
};

// REMOVE FROM CART
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await authModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId,
    );

    await user.save();

    const updatedUser = await authModel
      .findById(req.user.id)
      .populate("cart.product");

    res.status(200).json({
      message: "Removed from cart",
      cart: updatedUser.cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
};

// INCREASE QUANTITY
export const increaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await authModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId,
    );

    if (!cartItem) {
      return res.status(404).json({
        error: "Product not found in cart",
      });
    }

    cartItem.quantity += 1;

    await user.save();

    const updatedUser = await authModel
      .findById(req.user.id)
      .populate("cart.product");

    res.status(200).json({
      message: "Quantity increased",
      cart: updatedUser.cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
};

// DECREASE QUANTITY
export const decreaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await authModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId,
    );

    if (!cartItem) {
      return res.status(404).json({
        error: "Product not found in cart",
      });
    }

    // Prevent quantity below 1
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    }

    await user.save();

    const updatedUser = await authModel
      .findById(req.user.id)
      .populate("cart.product");

    res.status(200).json({
      message: "Quantity decreased",
      cart: updatedUser.cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
};

// CLEAR CART
export const clearCart = async (req, res) => {
  try {
    const user = await authModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    user.cart = [];

    await user.save();

    res.status(200).json({
      message: "Cart cleared",
      cart: [],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
};
