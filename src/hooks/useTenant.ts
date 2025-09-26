"use client";

import { useTheme } from '@mui/material/styles';
import { getClientTenant } from '@/utils/theme-utils';
import { main_palette } from '@/config/theme/index';
import { useState, useEffect } from 'react';
import type { TenantType } from '@/types/tenant';

/**
 * Hook personalizado para obter informações sobre o tenant atual
 */
export const useTenant = () => {
  const theme = useTheme();
  const [tenant, setTenant] = useState<TenantType>('default');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentTenant = getClientTenant();
    setTenant(currentTenant as TenantType);
    setIsLoading(false);
  }, []);

  return {
    /** Nome do tenant atual */
    tenant,
    /** Se ainda está carregando o tenant */
    isLoading,
    /** Paleta de cores do tenant atual */
    colors: main_palette[tenant as keyof typeof main_palette],
    /** Tema completo do MUI */
    theme,
    /** Se é o tenant padrão */
    isDefault: tenant === 'default',
  };
};

export default useTenant;