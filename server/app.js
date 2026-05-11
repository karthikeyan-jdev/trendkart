import express from "express";
import cors from "cors";
import todoRoutes from "./routes/productRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://trendkart.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/api/products", todoRoutes);

export default app;
