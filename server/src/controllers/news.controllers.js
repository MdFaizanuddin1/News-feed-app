import mongoose from "mongoose";
import { News } from "../models/news.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v4 as uuidv4 } from "uuid";
import { Author } from "../models/author.model.js";

// const getAllNews = asyncHandler(async (req, res) => {
//   const newsList = await News.find().sort({ createdAt: -1 }); // Sort by latest news

//   if (!newsList || newsList.length < 1) {
//     throw new ApiError(404, "Something went wrong while fetching news");
//   }
//   const indexes = await News.collection.getIndexes();
//   //   console.log(indexes);

//   return res.status(200).json(
//     new ApiResponse(
//       200,
//       newsList,
//       // `${newsList.length} News fetched successfully and indexing is ${indexes}`
//       `${newsList.length} News fetched successfully`
//     )
//   );
// });

const getAllNews = asyncHandler(async (req, res) => {
  const { category, sortBy, limit = 10, page = 1 } = req.query;
  console.log('req.query is ', category)

  let filter = {};
  if (category) filter.category = category; // Filter by category if provided

  let sortOptions = { createdAt: -1 }; // Default: Latest news first
  if (sortBy === "likes") sortOptions = { likes: -1 };
  if (sortBy === "views") sortOptions = { views: -1 };

  const newsList = await News.find(filter)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  if (!newsList || newsList.length === 0) {
    throw new ApiError(404, "No news articles found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        newsList,
        `${newsList.length} news articles fetched successfully`
      )
    );
});

// const getSpecificNews = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   console.log(id)
// //   const _id = new mongoose.ObjectId(id);
// //   console.log(_id)

//   const newsArticle = await News.aggregate([
//     { $match: { _id : id} }, // Match by ID
//     {
//       $lookup: {
//         from: "users",
//         localField: "authorId",
//         foreignField: "_id",
//         as: "author",
//       },
//     },
//     { $unwind: "$author" },
//     {
//       $project: {
//         title: 1,
//         content: 1,
//         category: 1,
//         likes: { $size: "$likes" }, // Count likes
//         views: 1,
//         createdAt: 1,
//         "author.name": 1,
//       },
//     },
//   ]);

//   if (!newsArticle || newsArticle.length === 0) {
//     throw new ApiError(404, "News article not found");
//   }

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(200, newsArticle[0], "News article fetched successfully")
//     );
// });

const getSpecificNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await News.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    { $inc: { views: 1 } },
    { new: true }
  );

  const newsArticle = await News.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Match by news article ID
    {
      $lookup: {
        from: "authors", // Ensure collection name matches exactly in MongoDB
        localField: "authorId", // String field in News
        foreignField: "_id", // String _id in Authors
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true, // Avoid errors if no author found
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        content: 1,
        category: 1,
        likes: 1,
        views: 1,
        image: 1,
        author: {
          name: "$author.name",
          email: "$author.email",
        }, // Include relevant author details
        createdAt: 1,
      },
    },
  ]);

  if (!newsArticle || newsArticle.length === 0) {
    throw new ApiError(404, "News article not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      newsArticle[0], // Aggregation returns an array
      "News article fetched successfully"
    )
  );
});

const createNews = asyncHandler(async (req, res) => {
  const { title, content, category, image } = req.body;

  if (!title || !content || !category) {
    throw new ApiError(400, "All fields are required");
  }

  // Ensure user is authenticated
  if (!req.user || !req.user.email || !req.user.userName) {
    throw new ApiError(401, "Unauthorized: User details missing");
  }

  // Check if the author already exists
  let author = await Author.findOne({ email: req.user.email });

  // If not, create a new author with a string UUID
  if (!author) {
    author = new Author({
      _id: uuidv4(), // Generate a unique string-based UUID
      name: req.user.userName,
      email: req.user.email,
    });
    await author.save();
  }
  //   console.log("author is", author);

  // Create the news article
  const news = new News({
    title,
    content,
    category,
    image,
    authorId: author._id, // Use the string-based UUID
  });

  await news.save();

  // Emit event for real-time updates
  req.io.emit("news:new", news);

  return res
    .status(201)
    .json(new ApiResponse(201, news, "News article created successfully"));
});

export { getAllNews, getSpecificNews, createNews };
