import api from "@/config/api";
import { IProfile, IProfileForm } from "@/types/Profile";
import IRegulation from "@/types/Regulation";
import { IResponseBody } from "@/types/Request";
import ErrorException from "@/utils/errorException";

export default class ProfileService {
    private static path = "/profile";

    static async get(): Promise<IResponseBody<IProfile[]>> {
        try {
            const response = await api.get(this.path);
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }
    static async put(data: IProfileForm): Promise<IResponseBody<undefined>> {
        try {
            const response = await api.post(this.path, data);
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }
    static async updatePicture(data: FormData): Promise<IResponseBody<undefined>> {
        try {
            const response = await api.post(this.path + "/picture", data);
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }
}