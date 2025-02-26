import { useState } from "react";
import axios from "axios";
import { create } from "../../routes";

const CreateNews = () => {
  const [newsData, setNewsData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setNewsData({ ...newsData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token") ?? "";
      const response = await axios.post(`${create}`, newsData, {
        withCredentials: true, // Send cookies for authentication
        // headers: { "Content-Type": "application/json" }
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setMessage("News created successfully!");
        setNewsData({ title: "", content: "", category: "", image: "" });
      }
    } catch (error) {
      console.error("Error creating news:", error);
      setMessage("Failed to create news. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create News</h2>

      {message && (
        <p className="text-center text-lg font-semibold text-green-600">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold">Title:</label>
          <input
            type="text"
            name="title"
            value={newsData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-semibold">Content:</label>
          <textarea
            name="content"
            value={newsData.content}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            rows="4"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold">Category:</label>
          <select
            name="category"
            value={newsData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">Select a category</option>
            <option value="sports">sports</option>
            <option value="tech">tech</option>
            <option value="world">world</option>
            <option value="business">business</option>
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-semibold">Image URL:</label>
          <input
            type="text"
            name="image"
            value={newsData.image}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create News"}
        </button>
      </form>
    </div>
  );
};

export default CreateNews;
