import express from "express";

const userRouter = express.Router();
import { userLogin, userSignup } from "../controllers/user.js";

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);

export default userRouter;
