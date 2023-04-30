import { Products } from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    let products;
    let query = Products.find();
    if (req.query) {
      let field = "title" || req.query.sort;
      let order = "asc" || req.query.order;
      let limit = 5 || req.query.limit;
      products = await query
        .sort({ [field]: order })
        .limit(parseInt(limit))
        .exec();
    } else {
      products = await query.exec();
    }
    return res.status(200).json(products);
  } catch (error) {
    throw res.sendStatus(400);
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Products.findById(id);
    return res.json(response);
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const response = await Products(newProduct).save();
    return res.status(201).json(response);
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const newProduct = req.body;
    const response = await Products.findByIdAndUpdate(id, newProduct);
    return res.json(response);
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Products.findByIdAndRemove(id);
    return res.json(response);
  } catch (error) {
    throw error;
  }
};
