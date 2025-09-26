import { main_palette } from '@/config/theme/index';
import type { TenantType } from '@/types/tenant';
import { TENANT_CONFIGS } from '@/types/tenant';

export const THEME_COOKIE_KEY = 'pocketcard_tenant_theme';
export const THEME_COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 365, // 1 ano
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
};

// Função para detectar tenant pelo domínio
export const getTenantFromDomain = (hostname?: string): TenantType => {
  if (!hostname) return 'default';

  const domain = hostname.toLowerCase();

  // Procura por padrões específicos no domínio usando as configurações
  for (const [tenantKey, config] of Object.entries(TENANT_CONFIGS)) {
    if (config.domainPatterns.some(pattern => domain.includes(pattern))) {
      return tenantKey as TenantType;
    }
  }

  return 'default';
};


// Função para obter tenant do cliente (localStorage + domínio)
export const getClientTenant = (): TenantType => {
  if (typeof window === 'undefined') return 'default';

  try {
    // Primeiro tenta localStorage
    const cached = localStorage.getItem(THEME_COOKIE_KEY);
    if (cached && main_palette[cached as TenantType]) {
      return cached as TenantType;
    }

    // Se não tem cache, detecta pelo domínio
    const tenant = getTenantFromDomain(window.location.hostname);
    localStorage.setItem(THEME_COOKIE_KEY, tenant);

    // Também salva no cookie para próximas requisições do servidor
    document.cookie = `${THEME_COOKIE_KEY}=${tenant}; max-age=${THEME_COOKIE_OPTIONS.maxAge}; path=/; samesite=${THEME_COOKIE_OPTIONS.sameSite}`;

    return tenant;
  } catch (error) {
    console.warn('Erro ao obter tenant do cliente:', error);
    return 'default';
  }
};