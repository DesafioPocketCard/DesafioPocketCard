import api from "@/config/api";
import IGift from "@/types/Gift";
import { IResponseBody } from "@/types/Request";
import ErrorException from "@/utils/errorException";

export default class GiftService {
    private static path = "/gift";
    private static highPath = "high-gift";


    static async get(id: string): Promise<IResponseBody<IGift[]>> {
        try {
            const response = await api.get<IResponseBody<IGift[]>>(this.path, { params: { id_grupo_premio: id } });
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }

    static async getById(id: string): Promise<IResponseBody<IGift[]>> {
        try {
            const response = await api.get<IResponseBody<IGift[]>>(this.path + '-id', { params: { id_premio: id } });
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }

    static async getHigh(): Promise<IResponseBody<IGift[]>> {
        try {
            const response = await api.get<IResponseBody<IGift[]>>(this.highPath);
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }
}