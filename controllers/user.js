import { Users } from "../models/user.js";
import bcrypt from "bcrypt";

export const userSignup = async (req, res) => {
  try {
    const userDetails = req.body;
    const userExists = await Users.findOne({ email: userDetails.email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hashPassword = await bcrypt.hash(
        userDetails.password,
        parseInt(process.env.SALT)
      );
      const user = {
        displayName: userDetails.displayName,
        email: userDetails.email,
        password: hashPassword,
        token: userDetails.token,
      };
      const response = await Users(user).save();
      return res.status(201).json(response);
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const userDetails = req.body;
    const user = await Users.findOne({ email: userDetails.email });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        userDetails.password,
        user.password
      );
      if (isPasswordMatch) {
        await Users.findByIdAndUpdate(user._id, {
          token: userDetails.token,
        });
        return res.status(200).json(userDetails);
      } else {
        res.statusMessage = "Wrong password";
        return res.status(400).end();
      }
    } else {
      res.statusMessage = "User not found";
      return res.status(400).end();
    }
  } catch (error) {
    res.statusMessage = "Something went wrong";
    return res.status(400).end();
  }
};
