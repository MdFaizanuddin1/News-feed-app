

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL_SubUn_sub as API_URL } from "../routes";

const Profile = () => {
  const user = useSelector((state) => state.user?.currentUser?.data) || {};
  
  // Ensure categories is always an array
  const [categories, setCategories] = useState(user.subscribedCategories || []);

  const categoryOptions = ["business", "sports", "world", "tech"];

  // Update categories when user data changes
  useEffect(() => {
    if (user.subscribedCategories) {
      setCategories(user.subscribedCategories);
    }
  }, [user.subscribedCategories]);

  const unsubscribedCategories = categoryOptions.filter(
    (category) => !categories.includes(category)
  );

  const handleSubscribe = async (category) => {
    try {
      const response = await axios.post(
        `${API_URL}/subscribe`,
        { categories: [category] },
        { withCredentials: true }
      );
      setCategories(response.data.subscribedCategories || []);
    } catch (error) {
      console.error("Subscription failed", error);
    }
  };

  const handleUnsubscribe = async (category) => {
    try {
      const response = await axios.post(
        `${API_URL}/unSubscribe`,
        { categories: [category] },
        { withCredentials: true }
      );
      setCategories(response.data.subscribedCategories || []);
    } catch (error) {
      console.error("Unsubscription failed", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h1>

      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">Name: {user.userName || "N/A"}</h2>
        <p className="text-gray-500">Email: {user.email || "N/A"}</p>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Subscribed Categories</h3>
          {categories.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleUnsubscribe(category)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium"
                >
                  Unsubscribe {category}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No subscribed categories</p>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Unsubscribed Categories</h3>
          {unsubscribedCategories.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2">
              {unsubscribedCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleSubscribe(category)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
                >
                  Subscribe {category}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">All categories are subscribed</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
