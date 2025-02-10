interface ISigInCredentials {
  email: string;
  senha: string;
  token?: string;
}

interface IUser {
  id: string;
  nome: string;
  email: string;
}

export type { ISigInCredentials, IUser };
