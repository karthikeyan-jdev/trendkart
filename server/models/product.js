import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      id: {
        type: Number,
      },

      name: {
        type: String,
        required: true,
      },

      slug: {
        type: String,
      },

      image: {
        type: String,
      },
    },

    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model("Product", productSchema);