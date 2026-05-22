import connectDB from "../config/database.js";
import { ProductModel } from "../models/product.js";
import { CategoryModel } from "../models/productCategories.js";

// GET PRODUCTS WITH PAGINATION
export const getProduct = async (req, res) => {
  try {
    await connectDB();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    // Search filter
    const filter = search
      ? {
          title: { $regex: search, $options: "i" },
        }
      : {};

    const products = await ProductModel.find(filter).skip(skip).limit(limit);

    const totalProducts = await ProductModel.countDocuments(filter);

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

    const product = await ProductModel.findOne({ _id: id });

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

export const getProductCategory = async (req, res) => {
  try {
    await connectDB();

    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
