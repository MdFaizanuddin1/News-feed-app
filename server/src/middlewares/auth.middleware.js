import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password"
    );

    if (!user) {
      throw new ApiError(401, "invalid user token");
    }
    //-----------

    req.user = user;

    ////////--------------
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid token");
  }
});
