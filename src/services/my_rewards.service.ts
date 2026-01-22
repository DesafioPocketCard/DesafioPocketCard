import api from "@/config/api";
import { IResponseBody } from "@/types/Request";

export interface IMyReward {
  id_premio: number;
  nome: string;
  img_premio: string;
  data_resgate: string;
  codigo_voucher: string | null;
  qtde_pontos_resgate: number;
}

export default class MyRewardsService {
  static async getAll(): Promise<IResponseBody<IMyReward[]>> {
    const response = await api.get<IResponseBody<IMyReward[]>>("/api/my-rewards");
    return response.data;
  }
}