import { Files } from "../models/file.js";
import { v4 as uuid4 } from "uuid";
import path from "path";
import { unlink } from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const previewFile = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Files.findOne({ uuid: id });
    if (!response) {
      res.json({ message: "Link has been expired!" });
    }
    const finalResponse = {
      uuid: response.uuid,
      filename: response.filename,
      fileSize: response.size,
      download: `${process.env.APP_BASE_URL}/api/files/download/${response.uuid}`,
    };
    return res.json(finalResponse);
  } catch (error) {
    throw error;
  }
};

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ error: "File not found" });
    }
    const newFile = {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      uuid: uuid4(),
      // senders: ,
      // receiver: ,
    };
    const response = await Files(newFile).save();
    res.status(201).json({
      file: `${process.env.APP_BASE_URL}/api/files/${response.uuid}`,
      uuid: response.uuid,
    });
    return setTimeout(() => {
      unlink(`${req.file.path}`, async (err) => {
        if (err) throw err;
        await Files.deleteOne({ uuid: response.uuid });
      });
    }, 15 * 60 * 1000);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    console.log(uuid);
    const response = await Files.findOne({ uuid: uuid });
    if (!response) {
      return res.json({ message: "Link has been expired!" });
    }
    const filePath = `${__dirname + "/../" + response.path}`;
    return res.download(filePath);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
