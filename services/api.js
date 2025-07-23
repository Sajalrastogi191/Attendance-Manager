import axios from "axios";

const API_URL = "http://10.21.0.147:5000/api"; // Use IP for real device testing

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
