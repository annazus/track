import axios from "axios";
import { AsyncStorage } from "react-native";
let api = axios.create({ baseURL: "http://localhost:3000" });

api.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const token = await AsyncStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
