"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import {
  main_palette,
  palette,
  fonts_style,
  breakpoints,
  shadows,
  muiStylesComponents,
} from "@/config/theme/index";

const DynamicThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [theme, setTheme] = useState(createTheme({} as never));

  const getTenantFromDomain = (): keyof typeof main_palette => {
    const domain = window.location.hostname.toLowerCase();

    const tenant = (
      Object.keys(main_palette) as Array<keyof typeof main_palette>
    ).find((key) => domain.includes(key));

    return tenant ?? "default";
  };

  useEffect(() => {
    const tenantFromDomain = getTenantFromDomain();

    const newTheme = createTheme({
      palette: {
        mode: "light",
        primary: main_palette[tenantFromDomain],
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

    const finalTheme = createTheme(newTheme, muiStylesComponents(newTheme));

    setTheme(finalTheme);
  }, []);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default DynamicThemeProvider;
