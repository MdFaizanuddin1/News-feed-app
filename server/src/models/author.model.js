import mongoose, { Schema } from "mongoose";

const authorSchema = new Schema(
  {
    _id: { type: String, required: true }, // Using string-based UUID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Author = mongoose.model("Author", authorSchema);
