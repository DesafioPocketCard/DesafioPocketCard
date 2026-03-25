import { signIn } from "next-auth/react";
import httpClient from "@/lib/http-client";
import { ISignInCredentials, ITokenResponse } from "./auth.type";

export class AuthService {
  static async login(values: ISignInCredentials) {
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (response?.error === "CredentialsSignin") {
      throw new Error("Não foi possível realizar a autenticação.");
    }

    if (response?.error) {
      throw new Error(response.error);
    }

    return {
      message: "Autenticação realizada com sucesso.",
    };
  }

  static async getToken(): Promise<ITokenResponse> {
    const response = await httpClient.post<ITokenResponse>("/getToken", {
      chave: process.env.API_KEY,
    });

    return response.data;
  }

  static async requestRecovery(email: string) {
    const response = await httpClient.post("/password/request", { email });
    return response.data;
  }

  static async verifyOTP(body: { email: string; code: string }) {
    const response = await httpClient.post("/password/validate", {
      email: body.email,
      token: body.code,
    });
    return response.data;
  }

  static async resetPassword(body: {
    email: string;
    token: string;
    password: string;
  }) {
    const response = await httpClient.post("/password/reset", {
      email: body.email,
      token: body.token,
      new_password: body.password,
    });
    return response.data;
  }
}
