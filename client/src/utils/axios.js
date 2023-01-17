import axios from "axios";

const instance = axios.create({
  baseURL: `${window.location.protocol}//${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}/api`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
