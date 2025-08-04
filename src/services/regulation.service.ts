import api from "@/config/api";
import IRegulation from "@/types/Regulation";
import { IResponseBody } from "@/types/Request";
import ErrorException from "@/utils/errorException";

export default class RegulationService {
    private static path = "/regulation";

    static async get(id: string): Promise<IResponseBody<IRegulation[]>> {
        try {
            const response = await api.get(this.path, { params: { id_campanha: id } });
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }
    static async acceptRegulation(id: string) {
        try {
            const response = await api.post("/regulation", { id_campanha: id });
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }
}