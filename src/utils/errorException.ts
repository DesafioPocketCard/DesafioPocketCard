import { AxiosError } from "axios";

interface IErrorPayload {
    success: boolean;
    message: string;
}

export default class ErrorException extends Error {
    public success: boolean;

    constructor(error: AxiosError<IErrorPayload>) {
        super(error.response?.data.message || "Ocorreu um erro, tente novamente mais tarde.");
        this.name = "ErrorException";
        this.success = error.response?.data.success ?? false;

        // Mantém o stack trace correto (para debug)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorException);
        }
    }

    static fromUnknown(error: unknown): ErrorException {
        return new ErrorException(error as AxiosError<IErrorPayload>);
    }
}
