export interface ICartItem {
  id_sacola_item: string;
  id_premio: string;
  nome_premio: string;
  valor_pontos: string;
  quantidade: string;
  nome_arquivo: string;
}

export interface ICartResponse {
  items: ICartItem[];
  total_pontos: number;
}

export interface IResgateResponse {
  id_resgate: number;
  message: string;
}

export interface IConfirmationResponse {
  success: boolean;
  message: string;
  id_resgate: number;
}
