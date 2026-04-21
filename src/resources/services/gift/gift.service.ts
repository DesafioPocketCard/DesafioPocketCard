import httpClient from "@/lib/http-client";
import { ICategory, IGift } from "./gift.type";
import { IResponseBody } from "@/types/Request";

type ApiGift = {
  id_premio?: string;
  id_grupo_premio?: string;
  nome?: string;
  nome_premio?: string;
  img_premio?: string;
  nome_arquivo?: string;
  qtde_pontos_resgate?: string | number;
  valor_pontos?: string | number;
  descricao_premio?: string;
  categoria_premio?: string;
};

export class GiftService {
  private static path = "/gift";
  private static highPath = "high-gift";

  private static normalizeGift(apiGift: ApiGift): IGift {
    const nome = apiGift.nome_premio ?? apiGift.nome ?? "";
    const imageUrl = apiGift.nome_arquivo ?? apiGift.img_premio ?? "";
    const pontos = apiGift.valor_pontos ?? apiGift.qtde_pontos_resgate ?? 0;

    return {
      id_premio: apiGift.id_premio ?? "",
      id_grupo_premio: apiGift.id_grupo_premio,
      nome_premio: nome,
      nome_arquivo: imageUrl,
      descricao_premio: apiGift.descricao_premio ?? "",
      valor_pontos:
        typeof pontos === "string" ? Number(pontos) : Number(pontos ?? 0),
      categoria_premio: apiGift.categoria_premio,
    };
  }

  static async get(id: string): Promise<IResponseBody<IGift[]>> {
    const response = await httpClient.get<IResponseBody<ApiGift[]>>(this.path, {
      params: { id_grupo_premio: id },
    });
    return {
      ...response.data,
      data: (response.data.data ?? []).map((g) => this.normalizeGift(g)),
    };
  }

  static async getById(id: string): Promise<IResponseBody<IGift[]>> {
    const response = await httpClient.get<IResponseBody<ApiGift[]>>(
      `${this.path}-id`,
      {
        params: { id_premio: id },
      },
    );
    return {
      ...response.data,
      data: (response.data.data ?? []).map((g) => this.normalizeGift(g)),
    };
  }

  static async getHigh(): Promise<IResponseBody<IGift[]>> {
    const response = await httpClient.get<IResponseBody<ApiGift[]>>(
      this.highPath,
    );
    return {
      ...response.data,
      data: (response.data.data ?? []).map((g) => this.normalizeGift(g)),
    };
  }

  static async getCategories(): Promise<IResponseBody<ICategory[]>> {
    const response = await httpClient.get<IResponseBody<ICategory[]>>(
      "/gift/categories",
    );
    return {
      ...response.data,
      data: (response.data.data ?? []).map((cat) => ({
        ...cat,
        nome_grupo_premio: cat.nome_grupo_premio || cat.categoria_premio || "",
      })),
    };
  }
}
