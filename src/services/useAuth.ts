import api from '@/config/api';
import { ISigInCredentials, IUser } from '@/types/Auth';
import { signIn } from 'next-auth/react';

export default function useAuth() {
  async function sigIn(values: ISigInCredentials) {
    const response = await signIn('credentials', {
      ...values,
      redirect: false,
    });

    if (response?.error === 'CredentialsSignin') {
      throw new Error('Não foi possível realizar a autenticação.');
    }

    if (response?.error) {
      throw new Error(response.error);
    }

    return {
      message: 'Autenticação realizada com sucesso.',
    };
  }
  async function getToken(): Promise<{
    success: boolean,
    token: string,
    expires_in: number
  }> {
    const response = await api.post("/getToken", { chave: process.env.API_KEY })

    return response.data
  }

  return { sigIn, getToken };
}
