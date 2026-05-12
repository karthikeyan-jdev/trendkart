import connectDB from "../config/database.js";
import { ProductModel } from "../models/product.js";

// GET PRODUCTS WITH PAGINATION
export const getProduct = async (req, res) => {
  try {
    await connectDB();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const products = await ProductModel.find()
      .skip(skip)
      .limit(limit);

    const totalProducts = await ProductModel.countDocuments();

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      hasMore: page * limit < totalProducts,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {
    await connectDB();

    const { id } = req.params;

    const product = await ProductModel.findOne({ id: Number(id) });

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to fetch product",
    });
  }
};