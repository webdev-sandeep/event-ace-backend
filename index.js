import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import jwt from "jsonwebtoken";
const app = express();

/* -------------------------- Built-in middlewares -------------------------- */

app.use(express.json());

/* -------------------------------------------------------------------------- */

const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
};

const attatchToken = (req, res, next) => {
  let token = jwt.sign({ ...req.body }, process.env.JWT_SECRET_KEY);
  req.body.token = token;
  next();
};

app.use("/users/", attatchToken, userRouter);
app.use("/products/", auth, productRouter);

app.listen(process.env.PORT, async () => {
  await mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to the database!");
    console.log(
      `listening on port ${process.env.PORT} : http://localhost:${process.env.PORT}`
    );
  });
});
