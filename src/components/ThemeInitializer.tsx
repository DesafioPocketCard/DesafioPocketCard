"use client";

import { useEffect } from 'react';
import { getClientTenant, THEME_COOKIE_KEY, THEME_COOKIE_OPTIONS } from '@/utils/theme-utils';
import type { TenantType } from '@/types/tenant';

interface ThemeInitializerProps {
  serverTenant?: TenantType;
}

/**
 * Componente para sincronizar tema entre servidor e cliente
 * Garante que o cookie seja atualizado quando necessário
 */
export default function ThemeInitializer({ serverTenant }: ThemeInitializerProps) {
  useEffect(() => {
    // Sempre atualiza o cookie com o tenant detectado no cliente
    const clientTenant = getClientTenant();
    
    // Atualiza o cookie para próximas requisições do servidor
    document.cookie = `${THEME_COOKIE_KEY}=${String(clientTenant)}; max-age=${THEME_COOKIE_OPTIONS.maxAge}; path=/; samesite=${THEME_COOKIE_OPTIONS.sameSite}`;
  }, [serverTenant]);

  return null; // Este componente não renderiza nada
}
