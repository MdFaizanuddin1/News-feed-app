import io from "socket.io-client";

export const API_URL = "http://localhost:8000/api/v1/news/getAll";

export const socket = io("http://localhost:8000");

export const specificNews = "/api/v1/news/get"

export const category = "/api/v1/news/getAll"

export const API_URL_SubUn_sub = "/api/v1/users";

export const subscribed = "/api/v1/users/getSubscribed"

