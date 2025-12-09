// src/types/Cart.ts

export interface ICartItem {
  id_sacola_item: number;
  nome_premio: string;
  img_premio: string;
  pontos_custo_unitario: number;
  quantidade: number;
}

export interface ICartData {
  itens: ICartItem[];
  total_pontos_sacola: number;
}

export interface ICartResponse {
  total_pontos_usuario: number;
  sacola: ICartData;
}

// Interface para a resposta do Solicitar Resgate
export interface IResgateResponse {
    success: boolean;
    message: string;
    id_resgate: number;
}