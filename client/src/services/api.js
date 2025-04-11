import axios from "axios";
// import .enc
const API = axios.create({
  baseURL: "https://travelblog-seby.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// Attach token if available
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
