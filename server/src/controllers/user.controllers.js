import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const options = {
  httpOnly: true,
  secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if ([email, userName, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(
      409,
      "User with email or userName or phone number already exists"
    );
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    userName,
    email,
    password: encryptedPassword,
  });

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering user");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      username: user.userName,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );

  return res
    .cookie("token", token, options)
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: createdUser, token },
        "User registered successfully"
      )
    );
});

const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password or user credentials");
  }

  const loggedInUser = await User.findById(user._id).select("-password");
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      username: user.userName,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );

  return res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          token,
        },
        "user logged in successfully"
      )
    );
});

const getAllUsers = asyncHandler(async (req, res) => {
  // need to modify
  const users = await User.find();
  if (!users) {
    throw new ApiResponse(400, "No users found");
  }
  res
    .status(200)
    .send(
      new ApiResponse(
        201,
        users,
        `Total ${users.length} users fetched successfully`
      )
    );
});

const changePass = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // Check if user exists
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check if old password is correct
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  // Prevent setting the same password
  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) {
    throw new ApiError(400, "New password must be different from the old password");
  }

  // Update password (ensure hashing works if using a pre-save hook)
  user.password = await bcrypt.hash (newPassword, 10);
  await user.save(); // Ensure hashing logic is handled inside the model

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});


const logOut = asyncHandler(async (req, res) => {
  // clear cookie
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        token: 1, //this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "user logged out"));
});

const getUser = asyncHandler(async (req, res) => {
  const userFromReq = req.user;
  const user = await User.findById(userFromReq._id).select("-password");

  if (!user) {
    throw new ApiError(404, "you are not authorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "user fetched successfully"));
});

export {
  registerUser,
  logInUser,
  getAllUsers,
  // -------- secure auth
  getUser,
  logOut,
  changePass,
};
