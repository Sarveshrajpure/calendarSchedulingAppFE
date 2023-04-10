import axios from "axios";

const localUrl = "http://localhost:3000/api";
const prodUrl = "https://calendar-scheduling-app-backend.onrender.com/api";

export const instance = axios.create({
  baseURL: prodUrl,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
