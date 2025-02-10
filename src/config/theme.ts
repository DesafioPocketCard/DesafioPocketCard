"use client";

import { createTheme } from "@mui/material";
import main_palette from "./theme/main-palette";
import palette from "./theme/colors";
import fonts_style from "./theme/fonts.style";
import breakpoints from "./theme/breakpoints";
import shadows from "./theme/shadows";
import muiStylesComponents from "./theme/mui-components.config";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: main_palette["novocred"],
    ...palette,
  },
  fonts: fonts_style,
  breakpoints,
  shadows,
});

theme = createTheme(theme, muiStylesComponents(theme));

export default theme;
