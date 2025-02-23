import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    category: String,
    image: String,
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    authorId: { type: String, ref: "Author", required: true },
  },
  {
    timestamps: true,
  }
);

// Apply indexes for optimization
newsSchema.index({ category: 1 }); // Index for filtering by category
newsSchema.index({ views: -1, likes: -1 }); // Index for sorting by popularity
newsSchema.index({ title: "text" }); // Full-text search index

const News = mongoose.model("News", newsSchema);

// News.createIndexes()
//   .then(() => console.log("Indexes created successfully"))
//   .catch((error) => console.error("Error creating indexes:", error));

export { News };
