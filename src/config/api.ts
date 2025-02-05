/* eslint-disable no-param-reassign */
import axios from 'axios';
import querySerializer from '@/utils/querySerializer';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: querySerializer,
  headers: {
    "ngrok-skip-browser-warning": true,
    platform: 'web',
  },
});

function isOnClient() {
  try {
    return typeof window !== 'undefined';
  } catch {
    return false;
  }
}

// api.interceptors.request.use(
//   async (config) => {
//     const session = await getSession();

//     if (isOnClient() && session?.userData.access_token) {
//       if (!config.headers.Authorization) {
//         config.headers.Authorization = `Bearer ${session?.userData.access_token}`;
//         return config;
//       }

//       delete config.headers.Authorization;
//     }
//     return config;
//   },
//   (err) => Promise.reject(err),
// );

export default api;
