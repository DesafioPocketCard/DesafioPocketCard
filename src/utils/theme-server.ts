import { cookies } from 'next/headers';
import { main_palette } from '@/config/theme/index';
import type { TenantType } from '@/types/tenant';
import { getTenantFromDomain, THEME_COOKIE_KEY } from './theme-utils';

/**
 * Função para obter tenant do servidor (cookies + headers)
 * APENAS para uso em Server Components
 */
export const getServerTenant = (): TenantType => {
  try {
    const cookieStore = cookies();
    const tenantCookie = cookieStore.get(THEME_COOKIE_KEY);
    
    // Se tem cookie válido, usa ele
    if (tenantCookie?.value && main_palette[tenantCookie.value as TenantType]) {
      return tenantCookie.value as TenantType;
    }
    
    // Tenta diferentes formas de obter hostname
    let hostname: string | undefined;
    
    // Vercel deployment
    if (process.env.VERCEL_URL) {
      hostname = process.env.VERCEL_URL;
    }
    // Production domain
    else if (process.env.NEXT_PUBLIC_APP_URL) {
      hostname = new URL(process.env.NEXT_PUBLIC_APP_URL).hostname;
    }
    // Development
    else {
      hostname = 'localhost';
    }
    
    return getTenantFromDomain(hostname);
  } catch (error) {
    // Fallback em caso de erro
    console.warn('Erro ao obter tenant do servidor:', error);
    return 'default';
  }
};

/**
 * Função para definir cookie de tenant no servidor
 * APENAS para uso em Server Actions/Routes
 */
export const setServerTenantCookie = (tenant: TenantType) => {
  try {
    const cookieStore = cookies();
    cookieStore.set(THEME_COOKIE_KEY, tenant, {
      maxAge: 60 * 60 * 24 * 365, // 1 ano
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  } catch (error) {
    console.warn('Erro ao definir cookie de tenant:', error);
  }
};