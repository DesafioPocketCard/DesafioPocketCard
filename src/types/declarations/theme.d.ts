import { Color } from "@mui/material";
import { ColorPartial } from "@mui/material/styles/createPalette";

type IFontSizes =
  | "h1-display"
  | "h2-large-title"
  | "h3-title"
  | "h4-subtitle"
  | "h5-body-large"
  | "h6-body-strong"
  | "pf-body"
  | "label"
  | "button";

interface IFontValues {
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

type IFonts = {
  [key in IFontSizes]: IFontValues;
};

interface IColors extends Omit<ColorPartial, "A400" | "A700"> {
  A300?: string;
}

type IPaletteTypes = "base";

type IPalette = {
  [key in IPaletteTypes]: IColors;
};

declare module "@mui/material/styles" {
  interface Theme {
    fonts: IFonts;
  }

  interface PaletteColor extends Color {}

  interface Palette extends IPalette {}

  interface PaletteOptions extends IPalette {}

  interface ThemeOptions {
    fonts: IFonts;
  }
}
