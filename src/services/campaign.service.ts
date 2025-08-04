import api from "@/config/api";
import { ICampaign } from "@/types/Campaign";
import { IResponseBody } from "@/types/Request";
import ErrorException from "@/utils/errorException";

export default class CampaignService {
    private static path = "/campaign";

    static async get(): Promise<IResponseBody<ICampaign[]>> {
        try {
            const response = await api.get<IResponseBody<ICampaign[]>>(this.path);
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }

}