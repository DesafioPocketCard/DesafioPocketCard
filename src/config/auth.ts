/* eslint-disable no-console */
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser, ISigInCredentials } from "@/types/Auth";
import api from "./api";

const credentials = CredentialsProvider<Record<string, any>>({
  name: "credentials",
  credentials: {},
  async authorize(credentials: unknown) {
    const { email, senha } = credentials as ISigInCredentials;
    try {
      const tokenResponse: {
        data: { success: boolean; token: string; expires_in: number };
      } = await api.post("/getToken", { chave: process.env.API_KEY });

      if (!tokenResponse.data.success) {
        throw new Error("Falha ao obter autorização");
      }

      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/validateLogin`,
        {
          email,
          senha,
          token: tokenResponse.data.token,
        },
      );

      if (response.data.success) {
        return { ...response.data, token: tokenResponse.data.token };
      }

      throw new Error("Login não autorizado");
    } catch (error: any) {
      console.error(error);
      throw new Error(error.response?.data?.message || "An error occurred");
    }
  },
});

const authConfig: NextAuthOptions = {
  pages: {
    signIn: "/signin",
    error: "/error",
    newUser: "/signin",
    signOut: "/sign",
  },
  providers: [credentials],
  callbacks: {
    jwt({ token, user }: any) {
      if (user) {
        return {
          ...token,
          user: user.user,
          token: user.token,
        };
      }

      return token;
    },
    session({ session, token }) {
      return { ...session, user: token.user, token: token.token };
    },
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
};

const auth = NextAuth(authConfig);

export default auth;
