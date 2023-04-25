import { Products } from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json(products);
  } catch (error) {
    throw error;
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
