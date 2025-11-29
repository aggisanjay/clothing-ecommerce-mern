import axios from "axios";

const api = axios.create({
  baseURL: "https://clothing-ecommerce-mern.onrender.com/api",
  withCredentials: true
});

export default api;
