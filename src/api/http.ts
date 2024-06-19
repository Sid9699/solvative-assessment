import axios, { AxiosHeaders } from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_GEO_DB_API_URL,
});

http.interceptors.request.use(
  (config) => {
    (config.headers as AxiosHeaders).set(
      "x-rapidapi-host",
      "wft-geo-db.p.rapidapi.com"
    );
    (config.headers as AxiosHeaders).set(
      "x-rapidapi-key",
      import.meta.env.VITE_GEO_DB_API_KEY
    );

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
