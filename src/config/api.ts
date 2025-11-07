/* eslint-disable no-param-reassign */
import axios from "axios";
import querySerializer from "@/utils/querySerializer";
import { getSession, signOut } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: querySerializer,
  headers: {
    platform: "web",
  },
});

function isOnClient() {
  try {
    return typeof window !== "undefined";
  } catch {
    return false;
  }
}

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (isOnClient() && session?.token) {
      if (!config.headers.Authorization) {
        config.headers.Authorization = session?.token;
        return config;
      }

      delete config.headers.Authorization;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

api.interceptors.response.use(
  async (response) => {
    if (response.data?.message === "Token inválido ou expirado.") {
      if (isOnClient()) {
        await signOut();
      }
    }
    return response;
  },
  (err) => Promise.reject(err),
);

export default api;
