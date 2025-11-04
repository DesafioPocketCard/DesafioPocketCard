interface ISigInCredentials {
  email: string;
  senha: string;
  token?: string;
}

interface IUser {
  id: string;
  nome: string;
  email: string;
  foto_perfil?: string;
}

export type { ISigInCredentials, IUser };
