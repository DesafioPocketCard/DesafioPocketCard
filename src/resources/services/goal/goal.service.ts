import httpClient from "@/lib/http-client";
import { IGoal } from "./goal.type";
import { IResponseBody } from "@/types/Request";

export class GoalService {
  private static path = "/goal";

  static async get(campaignId: string): Promise<IResponseBody<IGoal[]>> {
    const response = await httpClient.get<IResponseBody<IGoal[]>>(this.path, {
      params: { id_campanha: campaignId },
    });
    return response.data;
  }
}
