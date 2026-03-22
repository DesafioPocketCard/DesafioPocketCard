import httpClient from "@/lib/http-client";
import { IMyReward } from "./my-rewards.type";
import { IResponseBody } from "@/types/Request";

export class MyRewardsService {
  private static path = "/my-rewards";

  static async getAll(): Promise<IResponseBody<IMyReward[]>> {
    const response = await httpClient.get<IResponseBody<IMyReward[]>>(
      this.path,
    );
    return response.data;
  }
}
