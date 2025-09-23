import api from "@/config/api";
import IGiftCategory from "@/types/GiftCategory";
import { IResponseBody } from "@/types/Request";
import ErrorException from "@/utils/errorException";

export default class GiftCategoryService {
    private static path = "/category-gift";

    static async get(): Promise<IResponseBody<IGiftCategory[]>> {
        try {
            const response = await api.get<IResponseBody<IGiftCategory[]>>(this.path);
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }
    static async getById(id: string): Promise<IResponseBody<IGiftCategory[]>> {
        try {
            const response = await api.get<IResponseBody<IGiftCategory[]>>(this.path + '-id', { params: { id_grupo_premio: id } });
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }
}