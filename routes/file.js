import express from "express";

const fileRouter = express.Router();
import { previewFile, uploadFile, downloadFile } from "../controllers/file.js";

fileRouter.post("/", uploadFile);
fileRouter.get("/:id", previewFile);
fileRouter.get("/download/:uuid", downloadFile);

export default fileRouter;
