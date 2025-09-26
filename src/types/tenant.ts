import main_palette from '@/config/theme/main-palette';

/** 
 * Tipos de tenant disponíveis na aplicação
 */
export type TenantType = keyof typeof main_palette;

/**
 * Configuração de um tenant
 */
export interface TenantConfig {
  /** Nome do tenant */
  name: TenantType;
  /** Padrões de domínio para detecção automática */
  domainPatterns: string[];
  /** Nome de exibição do tenant */
  displayName: string;
  /** Descrição do tenant */
  description?: string;
}

/**
 * Mapeamento de configurações de tenant
 */
export const TENANT_CONFIGS: Record<TenantType, TenantConfig> = {
  default: {
    name: 'default',
    domainPatterns: ['localhost', 'pocketcard.local', 'default.pocketcard'],
    displayName: 'PocketCard',
    description: 'Tema padrão da aplicação',
  },
  novocred: {
    name: 'novocred',
    domainPatterns: ['novocred.pocketcard', 'www.novocred.local', 'novocred.com.br'],
    displayName: 'NovoCred',
    description: 'Tema da NovoCred',
  },
  autoline: {
    name: 'autoline',
    domainPatterns: ['autoline.pocketcard', 'www.autoline.local', 'autoline.com.br'],
    displayName: 'Autoline',
    description: 'Tema da Autoline',
  },
};
