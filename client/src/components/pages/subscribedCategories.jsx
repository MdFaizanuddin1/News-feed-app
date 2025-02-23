import { useEffect, useState } from "react";
import axios from "axios";
import { subscribed , categoryBy} from "../../routes";

const NewsFeed = () => {
  const [subscribedCategories, setSubscribedCategories] = useState([]);
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(true);

  // Configure Axios to include cookies in requests
  // axios.defaults.withCredentials = true;

  // Fetch Subscribed Categories
  useEffect(() => {
    const fetchSubscribedCategories = async () => {
      try {
        const response = await axios.get(
          `${subscribed}`,
          {
            withCredentials: true, // Ensures cookies are sent with the request
          }
        );
        console.log("Subscribed Categories Response:", response);
        setSubscribedCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching subscribed categories:", error);
      }
    };
    fetchSubscribedCategories();
  }, []);

  // Fetch News for Each Subscribed Category
  useEffect(() => {
    if (subscribedCategories.length === 0) return;

    const fetchNews = async () => {
      setLoading(true);
      try {
        const newsResults = {};
        for (const category of subscribedCategories) {
          const response = await axios.get(
            `${categoryBy}=${category}`,
            {
              withCredentials: true,
            }
          );
          newsResults[category] = response.data.data || [];
          // console.log('res is',response)
        }
        setNewsData(newsResults);

      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [subscribedCategories]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your News Feed</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : subscribedCategories.length > 0 ? (
        subscribedCategories.map((category) => (
          <div key={category} className="mb-6">
            <h2 className="text-xl font-semibold mb-2 capitalize">
              {category} News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsData[category]?.map((news, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg shadow-lg bg-white"
                >
                  <h3 className="text-lg font-medium">{news.title}</h3>
                  <p className="text-sm text-gray-600">{news.description}</p>
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 mt-2 inline-block"
                  >
                    Read more
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          You are not subscribed to any categories.
        </p>
      )}
    </div>
  );
};

export default NewsFeed;
