import { AxiosError } from "axios";

interface IErrorPayload {
    success: boolean;
    message: string;
}

export default class ErrorException extends Error {
    public success: boolean;
    public status?: number; // Adicionei para ajudar no debug

    constructor(error: AxiosError<IErrorPayload>) {
        // Lógica para decidir a mensagem
        let message = "Ocorreu um erro desconhecido.";

        if (error.response) {
            // CASO 1: O servidor respondeu (ex: 400, 403, 500)
            
            // Tenta pegar a mensagem personalizada do JSON se existir
            if (error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
                message = error.response.data.message;
            } else {
                // SE NÃO TIVER JSON (ex: HTML do firewall, erro 403), pega o status
                // Ex: "Erro 403: Forbidden"
                message = `Erro ${error.response.status}: ${error.response.statusText}`;
            }
        } else if (error.request) {
            // CASO 2: A requisição saiu mas não teve resposta (Timeout, Sem Internet, Bloqueio de Rede)
            message = "Erro de conexão: O servidor não respondeu.";
        } else {
            // CASO 3: Erro na configuração da requisição
            message = error.message;
        }

        super(message);
        
        this.name = "ErrorException";
        // Tenta pegar o success, ou assume false
        this.success = error.response?.data?.success ?? false;
        this.status = error.response?.status;

        // Mantém o stack trace correto (para debug)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorException);
        }
    }

    static fromUnknown(error: unknown): ErrorException {
        return new ErrorException(error as AxiosError<IErrorPayload>);
    }
}