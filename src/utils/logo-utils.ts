import type { TenantType } from '@/types/tenant';

// Importações estáticas das logos
// Default
import defaultLogo180 from '@/assets/icons/logos/default/180x180.svg';
import defaultLogoHorizontal from '@/assets/icons/logos/default/horizontal-w.svg';

// NovoCred
import novocredLogo180 from '@/assets/icons/logos/novocred/180x180.svg';
import novocredLogoHorizontal from '@/assets/icons/logos/novocred/horizontal-w.svg';

// Autoline
import autolineLogo180 from '@/assets/icons/logos/autoline/180x180.svg';
import autolineLogoHorizontalB from '@/assets/icons/logos/autoline/horizontal-b.png';
import autolineLogoHorizontalW from '@/assets/icons/logos/autoline/horizontal-w.png';
import autolineLogoHorizontalG from '@/assets/icons/logos/autoline/horizontal-g.png';
import autolineLogo10B from '@/assets/icons/logos/autoline/10x10-b.png';
import autolineLogo10W from '@/assets/icons/logos/autoline/10x10-w.png';
import autolineLogo10G from '@/assets/icons/logos/autoline/10x10-g.png';

/**
 * Tipos de logo disponíveis
 */
export type LogoType = '180x180' | 'horizontal' | 'horizontal-b' | 'horizontal-w' | 'horizontal-g' | '10x10-b' | '10x10-w' | '10x10-g';

/**
 * Dimensões padrão das logos
 */
export const LOGO_DIMENSIONS = {
  '180x180': { width: 180, height: 180 },
  'horizontal': { width: 156, height: 40 },
  'horizontal-b': { width: 156, height: 40 },
  'horizontal-w': { width: 156, height: 40 },
  'horizontal-g': { width: 156, height: 40 },
  '10x10-b': { width: 10, height: 10 },
  '10x10-w': { width: 10, height: 10 },
  '10x10-g': { width: 10, height: 10 },
} as const;

/**
 * Mapeamento de logos por tenant e tipo
 */
const LOGO_MAP = {
  default: {
    '180x180': defaultLogo180,
    'horizontal': defaultLogoHorizontal,
    'horizontal-b': defaultLogoHorizontal,
    'horizontal-w': defaultLogoHorizontal,
    'horizontal-g': defaultLogoHorizontal,
    '10x10-b': defaultLogo180,
    '10x10-w': defaultLogo180,
    '10x10-g': defaultLogo180,
  },
  novocred: {
    '180x180': novocredLogo180,
    'horizontal': novocredLogoHorizontal,
    'horizontal-b': novocredLogoHorizontal,
    'horizontal-w': novocredLogoHorizontal,
    'horizontal-g': novocredLogoHorizontal,
    '10x10-b': novocredLogo180,
    '10x10-w': novocredLogo180,
    '10x10-g': novocredLogo180,
  },
  autoline: {
    '180x180': autolineLogo180,
    'horizontal': autolineLogoHorizontalB,
    'horizontal-b': autolineLogoHorizontalB,
    'horizontal-w': autolineLogoHorizontalW,
    'horizontal-g': autolineLogoHorizontalG,
    '10x10-b': autolineLogo10B,
    '10x10-w': autolineLogo10W,
    '10x10-g': autolineLogo10G,
  },
} as const;

/**
 * Obtém a logo apropriada baseada no tenant e tipo
 */
export function getLogo(tenant: TenantType, logoType: LogoType = 'horizontal') {
  try {
    return LOGO_MAP[tenant]?.[logoType] || LOGO_MAP.default[logoType];
  } catch (error) {
    console.warn(`Erro ao obter logo para tenant ${tenant}, tipo ${logoType}:`, error);
    return LOGO_MAP.default.horizontal;
  }
}

/**
 * Obtém as dimensões da logo baseada no tipo
 */
export function getLogoDimensions(logoType: LogoType) {
  return LOGO_DIMENSIONS[logoType] || LOGO_DIMENSIONS.horizontal;
}

/**
 * Obtém informações completas da logo (src + dimensões)
 */
export function getLogoInfo(tenant: TenantType, logoType: LogoType = 'horizontal') {
  return {
    src: getLogo(tenant, logoType),
    ...getLogoDimensions(logoType),
  };
}