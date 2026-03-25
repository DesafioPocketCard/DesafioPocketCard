import httpClient from "@/lib/http-client";
import { IRegulation } from "./regulation.type";
import { IResponseBody } from "@/types/Request";

export class RegulationService {
  private static path = "/regulation";

  static async get(id: string): Promise<IResponseBody<IRegulation[]>> {
    const response = await httpClient.get<IResponseBody<IRegulation[]>>(
      this.path,
      {
        params: { id_campanha: id },
      },
    );
    return response.data;
  }

  static async accept(id: string): Promise<IResponseBody<any>> {
    const response = await httpClient.post<IResponseBody<any>>(this.path, {
      id_campanha: id,
    });
    return response.data;
  }
}
