import axios from "axios";

// eslint-disable-next-line no-unused-vars
const localUrl = "http://localhost:3000/api";
const prodUrl = "https://calendar-scheduling-app-backend.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL: prodUrl,
  timeout: 1000,
});
