"use client";

import { PropsWithChildren, useEffect, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import {
  main_palette,
  palette,
  fonts_style,
  breakpoints,
  shadows,
  muiStylesComponents,
} from "@/config/theme/index";
import { getClientTenant } from "@/utils/theme-utils";
import type { TenantType } from "@/types/tenant";

// Hook otimizado para gerenciar tenant
const useTenant = () => {
  const [tenant, setTenant] = useState<TenantType>(() => {
    // Durante SSR, retorna default para evitar mismatch
    if (typeof window === "undefined") {
      return "default";
    }
    // No cliente, inicializa com o tenant correto para evitar flash
    return getClientTenant();
  });

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Marca como hidratado e atualiza o tenant
    setIsHydrated(true);
    const currentTenant = getClientTenant();
    if (currentTenant !== tenant) {
      setTenant(currentTenant);
    }
  }, []);

  // Durante a hidratação, usa sempre 'default' para evitar mismatch
  return isHydrated ? tenant : "default";
};

const DynamicThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const tenant = useTenant();
  const [isThemeReady, setIsThemeReady] = useState(false);

  const theme = useMemo(() => {
    const newTheme = createTheme({
      palette: {
        mode: "light",
        primary: main_palette[tenant as keyof typeof main_palette],
        secondary: palette.secondary,
        base: palette.base,
        success: palette.success,
        error: palette.error,
        warning: palette.warning,
      },
      fonts: fonts_style,
      breakpoints,
      shadows,
    });

    return createTheme(newTheme, muiStylesComponents(newTheme));
  }, [tenant]);

  useEffect(() => {
    // Pequeno delay para suavizar a transição
    const timer = setTimeout(() => setIsThemeReady(true), 0);
    return () => clearTimeout(timer);
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          opacity: isThemeReady ? 1 : 0.95,
          transition: "opacity 150ms ease-in-out",
        }}
      >
        {children}
      </div>
    </ThemeProvider>
  );
};

export default DynamicThemeProvider;
