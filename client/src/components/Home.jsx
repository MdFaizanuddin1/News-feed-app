import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import io from "socket.io-client";

// const API_URL = "http://localhost:8000/api/v1/news/getAll";
// const socket = io("http://localhost:8000");
import { API_URL } from "../routes";
import { socket } from "../routes";

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9); // Fetch 5 articles per page
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch paginated news
  const fetchNews = async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?limit=${limit}&page=${pageNum}`);
      const data = await response.json();
      if (response.ok) {
        setNews((prevNews) => [...prevNews, ...data.data]); // Append new page data
        setHasMore(data.data.length === limit); // If less than limit, no more pages
      } else {
        console.error("Error fetching news:", data.message);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(page); // Load first page

    // Listen for new articles
    socket.on("news:new", (newArticle) => {
      setNews((prevNews) => [newArticle, ...prevNews]); // Add new article on top
    });

    // Listen for updates (likes, views)
    socket.on("news:update", (updatedArticle) => {
      setNews((prevNews) =>
        prevNews.map((item) =>
          item._id === updatedArticle._id ? updatedArticle : item
        )
      );
    });

    return () => {
      socket.off("news:new");
      socket.off("news:update");
    };
  }, []);

  // Load more news when "Load More" button is clicked
  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
      fetchNews(page + 1);
    }
  };

  return (
    // <div className="w-full p-4 bg-blue-100 min-h-screen">
    //   <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
    //     News Feed
    //   </h1>
    //   {news.length === 0 ? (
    //     <p className="text-center text-gray-500">Loading news...</p>
    //   ) : (
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {news.map((item) => (
    //         <Link to={`/news/${item._id}`} key={item._id}>
    //           <div className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 bg-white cursor-pointer">
    //             <img
    //               src={item.image}
    //               alt={item.title}
    //               className="w-full h-48 object-cover"
    //             />
    //             <div className="p-4">
    //               <h2 className="text-xl font-semibold text-gray-800 mb-2">
    //                 {item.title}
    //               </h2>
    //               <p className="text-gray-600 text-sm line-clamp-3">
    //                 {item.content}
    //               </p>
    //               <p className="text-gray-500 text-xs mt-2">
    //                 Category: {item.category}
    //               </p>
    //               <p className="text-gray-500 text-xs mt-1">
    //                 Likes: {item.likes} | Views: {item.views}
    //               </p>
    //             </div>
    //           </div>
    //         </Link>
    //       ))}
    //     </div>
    //   )}
    //   {hasMore && (
    //     <div className="text-center mt-6">
    //       <button
    //         onClick={loadMore}
    //         disabled={loading}
    //         className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105"
    //       >
    //         {loading ? "Loading..." : "Load More"}
    //       </button>
    //     </div>
    //   )}
    // </div>

    <div className="w-full p-4 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        News Feed
      </h1>
      {news.length === 0 ? (
        <p className="text-center text-gray-500">Loading news...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Link to={`/news/${item._id}`} key={item._id} className="h-full">
              <div className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 bg-white cursor-pointer h-full flex flex-col">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-grow flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                    {item.content}
                  </p>
                  <div className="mt-auto">
                    <p className="text-gray-500 text-xs">
                      Category: {item.category}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Likes: {item.likes} | Views: {item.views}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
