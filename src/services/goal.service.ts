import api from "@/config/api";
import IGoal from "@/types/Goal";
import { IResponseBody } from "@/types/Request";
import ErrorException from "@/utils/errorException";

export default class GoalService {
    private static path = "/goal";

    static async get(id: string): Promise<IResponseBody<IGoal[]>> {
        try {
            const response = await api.get<IResponseBody<IGoal[]>>(this.path, { params: { id_campanha: id } });
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }
}