// src/services/Cart.service.ts

import api from "@/config/api"; // O arquivo que configura o Axios
import { IResponseBody } from "@/types/Request"; 
import { ICartResponse, IResgateResponse } from "@/types/Cart";
import ErrorException from "@/utils/errorException";


export interface IConfirmationResponse {
    success: boolean;
    message: string;
    id_resgate: number;
}

export default class CartService {
    private static path = "/cart";
    private static resgatePath = "/rescue";

    // GET /api/Cart
    static async get(): Promise<IResponseBody<ICartResponse>> {
        try {
            const response = await api.get<IResponseBody<ICartResponse>>(this.path);
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }

    // DELETE /api/Cart?id_Cart_item=...
    static async remove(idCartItem: number): Promise<void> {
        try {
            // Passamos o ID via query string
            await api.delete(`${this.path}?id_sacola_item=${idCartItem}`);
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }

    // POST /api/resgate (Solicitar Resgate - Etapa 1)
    static async solicitarResgate(): Promise<IResgateResponse> {
        try {
            const response = await api.post<IResgateResponse>(this.resgatePath);
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }

    static async confirmarResgate(id_resgate: number, token_resgate: string): Promise<IConfirmationResponse> {
        try {
            const response = await api.post<IConfirmationResponse>(`${this.resgatePath}/confirm`, {
                id_resgate,
                token_resgate
            });
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }
    static async adicionarItem(id_premio: number, quantidade: number = 1): Promise<IResponseBody<any>> {
    try {
      const response = await api.post(this.path, {
        id_premio: id_premio,
        quantidade: quantidade
      });
      return response.data;
    } catch (error) {
      throw ErrorException.fromUnknown(error);
    }
  }

    
}