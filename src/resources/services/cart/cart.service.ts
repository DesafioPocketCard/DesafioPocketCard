import httpClient from "@/lib/http-client";
import {
  ICartResponse,
  IResgateResponse,
  IConfirmationResponse,
} from "./cart.type";
import { IResponseBody } from "@/types/Request";

export class CartService {
  private static path = "/cart";
  private static resgatePath = "/rescue";

  static async get(): Promise<IResponseBody<ICartResponse>> {
    const response = await httpClient.get<IResponseBody<ICartResponse>>(
      this.path,
    );
    return response.data;
  }

  static async remove(idCartItem: string): Promise<void> {
    await httpClient.delete(`${this.path}?id_sacola_item=${idCartItem}`);
  }

  static async adicionarItem(
    id_premio: string,
    quantidade: number = 1,
  ): Promise<IResponseBody<any>> {
    const response = await httpClient.post<IResponseBody<any>>(this.path, {
      id_premio,
      quantidade,
    });
    return response.data;
  }

  static async solicitarResgate(): Promise<IResponseBody<IResgateResponse>> {
    const response = await httpClient.post<IResponseBody<IResgateResponse>>(
      this.resgatePath,
    );
    return response.data;
  }

  static async confirmarResgate(
    id_resgate: number,
    token_resgate: string,
  ): Promise<IResponseBody<IConfirmationResponse>> {
    const response = await httpClient.post<
      IResponseBody<IConfirmationResponse>
    >(`${this.resgatePath}/confirm`, {
      id_resgate,
      token_resgate,
    });
    return response.data;
  }
}
