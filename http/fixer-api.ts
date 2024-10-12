import axios from "axios";

export const fixerApi = axios.create({ baseURL: "https://data.fixer.io/api/" });

fixerApi.interceptors.request.use((req) => {
  req.params = {
    ...req.params,
    access_key: process.env.NEXT_PUBLIC_FIXER_API_KEY,
  };

  return req;
});
