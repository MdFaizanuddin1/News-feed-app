import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { specificNews } from "../../routes";

const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${specificNews}/${id}`);
        const result = await response.json();
        console.log(result);
        setNews(result.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!news) return <p className="text-center text-red-500">News not found</p>;

  return (
    <div className="w-full p-6 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto shadow-lg rounded-lg overflow-hidden bg-gray-100">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
            {news.title}
          </h1>
          <p className="text-gray-700 mb-4 text-lg">{news.content}</p>
          <p className="text-gray-600 text-sm mb-2">
            Category: <span className="font-semibold">{news.category}</span>
          </p>
          <p className="text-gray-600 text-sm mb-2">
            Likes: <span className="font-semibold">{news.likes}</span> | Views:{" "}
            <span className="font-semibold">{news.views}</span>
          </p>
          <p className="text-gray-600 text-sm">
            Published by:{" "}
            <span className="font-semibold">{news.author.name}</span> (
            {news.author.email})
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
