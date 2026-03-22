import axios from "axios";
import { getSession } from "next-auth/react";

const isServer = typeof window === "undefined";

const httpClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://admin.pocketcard.com.br/api",
  headers: {
    ...(isServer && {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    }),
  },
});

httpClient.interceptors.request.use(
  async (config) => {
    // Only fetch session client-side in the interceptor if needed,
    // or pass token explicitly in server calls.
    if (!isServer) {
      const session = await getSession();
      if (session?.token && !config.headers.Authorization) {
        config.headers.Authorization = session.token;
      }
    }
    return config;
  },
  (err) => Promise.reject(err),
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (!isServer && !window.location.pathname.includes("/signin")) {
        // Simple redirect for token expiry
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  },
);

export default httpClient;
