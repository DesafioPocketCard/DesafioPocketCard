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
  const [tenant, setTenant] = useState("novocred");

  const getTenantFromDomain = () => {
    const domain = window.location.hostname;

    if (domain.includes("novocred")) {
      return "novocred";
    }

    return "default";
  };

  useEffect(() => {
    const tenantFromDomain = getTenantFromDomain();
    setTenant(tenantFromDomain);

    const newTheme = createTheme({
      palette: {
        mode: "light",
        primary: main_palette[tenantFromDomain],
        ...palette,
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
