// import io from "socket.io-client";

// export const API_URL = "http://localhost:8000/api/v1/news/getAll";

// export const socket = io("http://localhost:8000");

// export const specificNews = "/api/v1/news/get"

// export const category = "/api/v1/news/getAll"

// export const API_URL_SubUn_sub = "/api/v1/users";

// export const subscribed = "/api/v1/users/getSubscribed"


import io from "socket.io-client";

export const API_BASE_URL = "https://news-feed-app-xfgn.onrender.com";

export const API_URL = `${API_BASE_URL}/api/v1/news/getAll`;

export const socket = io(API_BASE_URL);

export const specificNews = `${API_BASE_URL}/api/v1/news/get`;

export const category = `${API_BASE_URL}/api/v1/news/getAll`;

export const API_URL_SubUn_sub = `${API_BASE_URL}/api/v1/users`;

export const subscribed = `${API_BASE_URL}/api/v1/users/getSubscribed`;

export const categoryBy = `${API_BASE_URL}/api/v1/news/getAll?category`;

export const users = `${API_BASE_URL}/api/v1/users`;

export const create = `${API_BASE_URL}/api/v1/news/create`;