import axios from "axios";

const api = axios.create({
  baseURL: "https://clothing-ecommerce-mern-hr3u.vercel.app/api",
  withCredentials: true
});

export default api;
