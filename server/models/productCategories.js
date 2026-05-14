import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    image: {
      type: String,
      default: "https://placehold.co/400",
    },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel = mongoose.model("Category", categorySchema);

