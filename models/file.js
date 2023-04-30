import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uuid: { type: String, required: true },
    senders: { type: String },
    receiver: { type: String },
  },
  { timestamps: true }
);

export const Files = mongoose.model("Files", fileSchema);
