import express from "express";

const productRouter = express.Router();
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", createProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
