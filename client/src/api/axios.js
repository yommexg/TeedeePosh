import axios from "axios";

const BASE_URL = "https://posh-server-api.onrender.com";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axios.create({
  baseURL: BASE_URL,
});
