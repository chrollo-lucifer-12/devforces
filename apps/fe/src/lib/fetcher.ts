import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
