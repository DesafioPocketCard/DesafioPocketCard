"use client";

import { useMemo } from 'react';
import { useTenant } from './useTenant';
import { getLogo, getLogoDimensions, getLogoInfo, type LogoType } from '@/utils/logo-utils';

/**
 * Hook personalizado para obter logos dinâmicas baseadas no tenant atual
 */
export const useLogo = (logoType: LogoType = 'horizontal') => {
  const { tenant, isLoading } = useTenant();

  const logoInfo = useMemo(() => {
    if (isLoading) {
      // Durante o carregamento, retorna logo padrão
      return getLogoInfo('default', logoType);
    }
    
    return getLogoInfo(tenant, logoType);
  }, [tenant, logoType, isLoading]);

  return {
    /** Source da logo (import estático) */
    src: logoInfo.src,
    /** Largura recomendada da logo */
    width: logoInfo.width,
    /** Altura recomendada da logo */
    height: logoInfo.height,
    /** Se ainda está carregando o tenant */
    isLoading,
    /** Nome do tenant atual */
    tenant,
    /** Função para obter logo de tipo específico */
    getLogo: (type: LogoType) => getLogo(tenant, type),
    /** Função para obter dimensões de tipo específico */
    getDimensions: (type: LogoType) => getLogoDimensions(type),
  };
};

export default useLogo;