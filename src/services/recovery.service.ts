import api from "@/config/api";
import { IResponseBody } from "@/types/Request";
import ErrorException from "@/utils/errorException";

export default class RecoveryService {
    static async sendRecoveryEmail(email: string): Promise<IResponseBody<undefined>> {
        try {
            const response = await api.post("/password/request", { email });
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }
    static async codeValidate(body: { email: string, token: string }): Promise<IResponseBody<undefined>> {
        try {
            const response = await api.post("/password/validate", body);
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }
    static async passwordReset(body: { email: string, token: string, new_password: string }): Promise<IResponseBody<undefined>> {
        try {
            const response = await api.post("/password/reset", body);
            return response.data;
        } catch (error) {
            throw ErrorException.fromUnknown(error);
        }
    }
}