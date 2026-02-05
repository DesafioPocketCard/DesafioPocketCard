/* eslint-disable no-param-reassign */
import axios from "axios";
import { destroyCookie } from "nookies";
import querySerializer from "@/utils/querySerializer";
import { getSession, signOut } from "next-auth/react";

// Verifica se está rodando no servidor
const isServer = typeof window === 'undefined';

const api = axios.create({
  baseURL: "https://admin.pocketcard.com.br/api",
  headers: {
    // SÓ adiciona o User-Agent fake se estiver no SERVIDOR (Node.js)
    ...(isServer && {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    }),
  }
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
/*
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
*/

api.interceptors.response.use(
  (response) => {
    // Se deu tudo certo, apenas passa a resposta para frente
    return response;
  },
  (error) => {
    // Se o erro tiver resposta do servidor
    if (error.response) {
      
      // Checa se é erro de Token (401 - Unauthorized)
      if (error.response.status === 401) {
        
        // 1. Limpa os dados do usuário (ajuste a chave conforme seu projeto)
        // localStorage.removeItem('pocketcard.token');
        // destroyCookie(null, 'pocketcard.token'); 

        // 2. Redirecionamento forçado para o login
        // Usamos window.location porque o Router do Next não funciona bem fora de componentes React
        if (typeof window !== 'undefined') {
            // Evita loop se já estiver no login
            if (!window.location.pathname.includes('/signin')) {
                alert("Sua sessão expirou. Faça login novamente."); // Opcional: Alerta simples
                window.location.href = "/signin";
            }
        }
      }
    }
    
    // Retorna o erro para que o componente também saiba que falhou (opcional)
    return Promise.reject(error);
  }
);


export default api;
