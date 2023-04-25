import { Users } from "../models/user.js";

export const userSignup = async (req, res) => {
  try {
    const userDetails = req.body;
    const userExists = await Users.findOne({ email: userDetails.email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const response = await Users(userDetails).save();
      return res.status(201).json(response);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const userDetails = req.body;
    const user = await Users.findOne({ email: userDetails.email });
    if (user) {
      if (user.password === userDetails.password) {
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
