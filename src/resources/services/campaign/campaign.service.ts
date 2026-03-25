import httpClient from "@/lib/http-client";
import { ICampaign } from "./campaign.type";
import { IResponseBody } from "@/types/Request";

export class CampaignService {
  private static path = "/campaign";

  static async get(): Promise<IResponseBody<ICampaign[]>> {
    const response = await httpClient.get<IResponseBody<ICampaign[]>>(
      this.path,
    );
    return response.data;
  }
}
