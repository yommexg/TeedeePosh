import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axios.create({
  baseURL: BASE_URL,
});
