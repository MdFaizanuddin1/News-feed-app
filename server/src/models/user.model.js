import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    subscribedCategories: {
      type: [String], // Defines an array of strings
      default: [], // Default is an empty array
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
