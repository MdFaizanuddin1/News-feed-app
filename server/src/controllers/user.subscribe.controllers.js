import { User } from "../models/user.model.js"; // Adjust path as needed
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Allowed categories
const ALLOWED_CATEGORIES = ["sports", "tech", "world", "business"];

/**
 * Subscribe to categories
 * @route POST /api/users/subscribe
 */
const subscribeToCategories = asyncHandler(async (req, res) => {
  const { categories } = req.body;

  const userId = req.user._id;

  if (!userId || !categories || !Array.isArray(categories)) {
    throw new ApiError(
      400,
      "Invalid request. Provide userId and categories array."
    );
  }

  // Validate categories
  const invalidCategories = categories.filter(
    (cat) => !ALLOWED_CATEGORIES.includes(cat)
  );
  if (invalidCategories.length > 0) {
    throw new ApiError(
      400,
      `Invalid categories: ${invalidCategories.join(", ")}`
    );
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Add new categories (avoid duplicates)
  user.subscribedCategories = Array.from(
    new Set([...user.subscribedCategories, ...categories])
  );

  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, user.subscribedCategories, "Subscribed successfully")
    );
});

/**
 * Unsubscribe from categories
 * @route POST /api/users/unsubscribe
 */
const unsubscribeFromCategories = asyncHandler(async (req, res) => {
  const { categories } = req.body;

  const userId = req.user._id;

  if (!userId || !categories || !Array.isArray(categories)) {
    throw new ApiError(
      400,
      "Invalid request. Provide userId and categories array."
    );
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Remove selected categories
  user.subscribedCategories = user.subscribedCategories.filter(
    (cat) => !categories.includes(cat)
  );

  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.subscribedCategories,
        "Unsubscribed successfully"
      )
    );
});

/**
 * Get subscribed categories
 * @route GET /api/users/:userId/subscriptions
 */
const getSubscribedCategories = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.subscribedCategories,
        user.subscribedCategories.length > 0
          ? `${user.subscribedCategories.length} subscribed categories`
          : `No subscribed categoriesP`
      )
    );
});

export {
  subscribeToCategories,
  unsubscribeFromCategories,
  getSubscribedCategories,
};
