export interface ISignInCredentials {
  email: string;
  senha: string;
}

export interface IAuthResponse {
  message: string;
}

export interface ITokenResponse {
  success: boolean;
  token: string;
  expires_in: number;
}
