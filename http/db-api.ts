import axios from "axios";

export const dbApi = axios.create({
  baseURL: process.env.DB_API,
});
