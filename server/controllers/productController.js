import connectDB from "../config/database.js";
import { ProductModel } from "../models/product.js";

//get
export const getProduct = async (req, res) => {
  try {
    await connectDB();

    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
