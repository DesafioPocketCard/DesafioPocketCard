/* eslint-disable import/no-mutable-exports */

"use client";

import { Shadows, createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6143B3",
      light: "#EFECF7",
      dark: "#352562",
      contrastText: "#EFECF7",
      "50": "#EFECF7",
      "100": "#CEC5E7",
      "200": "#B6A9DC",
      "300": "#9581CC",
      "400": "#8169C2",
      "500": "#6143B3",
      "600": "#583DA3",
      "700": "#45307F",
      "800": "#352562",
      "900": "#291C4B",
    },
    secondary: {
      main: "#818181",
      light: "#EBEEF2",
      dark: "#292929",
      contrastText: "#EFEFEF",
      "50": "#EFEFEF",
      "100": "#CECECE",
      "200": "#B6B6B6",
      "300": "#959595",
      "400": "#818181",
      "500": "#616161",
      "600": "#585858",
      "700": "#454545",
      "800": "#353535",
      "900": "#292929",
    },
    base: {
      "50": "#FFFFFF",
      "100": "#F7F7F7",
      "200": "#EDEDED",
      "300": "#DEDEDE",
      "400": "#CCCCCC",
      "500": "#B3B3B3",
      "600": "#9C9C9C",
      "700": "#707070",
      "800": "#595959",
      "900": "#404040",
      A100: "#2E2E2E",
      A200: "#121212",
      A300: "#000000",
    },
    success: {
      "50": "#DCFCE7",
      "100": "#BBF7D0",
      "200": "#86EFAC",
      "300": "#4ADE80",
      "400": "#22C55E",
      "500": "#16A34A",
      "600": "#15803D",
    },
    error: {
      "50": "#FEE2E2",
      "100": "#FECACA",
      "200": "#FCA5A5",
      "300": "#F87171",
      "400": "#EF4444",
      "500": "#DC2626",
      "600": "#B91C1C",
    },
    warning: {
      "50": "#FEF9C3",
      "100": "#FEF08A",
      "200": "#FDE047",
      "300": "#FACC15",
      "400": "#EAB308",
      "500": "#CA8A04",
      "600": "#A16207",
    },
  },
  fonts: {
    "h1-display": {
      fontFamily: "var(--primary-font), sans-serif",
      fontWeight: "600",
      fontSize: "68px",
      lineHeight: "auto",
    },
    "h2-large-title": {
      fontFamily: "var(--primary-font), sans-serif",
      fontWeight: "600",
      fontSize: "40px",
      lineHeight: "auto",
    },
    "h3-title": {
      fontFamily: "var(--primary-font), sans-serif",
      fontWeight: "700",
      fontSize: "28px",
      lineHeight: "32px",
    },
    "h4-subtitle": {
      fontFamily: "var(--primary-font), sans-serif",
      fontWeight: "500",
      fontSize: "20px",
      lineHeight: "auto",
    },
    "h5-body-large": {
      fontFamily: "var(--primary-font), sans-serif",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "auto",
    },
    "h6-body-strong": {
      fontFamily: "var(--secondary-font), sans-serif",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "auto",
    },
    "pf-body": {
      fontFamily: "var(--secondary-font), sans-serif",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "auto",
    },
    label: {
      fontFamily: "var(--secondary-font), sans-serif",
      fontWeight: "400",
      fontSize: "12px",
      lineHeight: "auto",
    },
    button: {
      fontFamily: "var(--secondary-font), sans-serif",
      fontWeight: "600",
      fontSize: "16px",
      lineHeight: "auto",
    },
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 640,
      md: 920,
      lg: 1200,
      xl: 1536,
    },
  },
  shadows: [
    "none",
    "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
    "box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.25)",
    "box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.25)",
    "box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.30)",
  ] as unknown as Shadows,
});

theme = createTheme(theme, {
  typography: {
    allVariants: {
      ...theme.fonts["pf-body"],
    },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        list: {
          maxHeight: "205px",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          ...theme.fonts["label"],
          color: theme.palette.base[700],
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.secondary.light,
          minHeight: "56px",
          fieldset: {
            borderColor: "transparent !important",
          },
          "&:hover fieldset": {
            borderColor: `${theme.palette.primary[400]} !important`,
          },
        },
        input: {
          ...theme.fonts["label"],
          color: theme.palette.base[900],
          "&::placeholder": {
            ...theme.fonts["pf-body"],
            color: theme.palette.base[900],
          },
        },
      },
    },
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(106, 87, 238, 0.05)",
          borderRadius: "20px",
          color: theme.palette.primary.main,
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: theme.palette.common.black,
          fontWeight: "medium",
          "&.Mui-disabled": {
            color: theme.palette.primary.light,
            backgroundColor: "rgba(106, 87, 238, 0.1)",
          },
          "&.Mui-selected": {
            color: "white",
            backgroundColor: theme.palette.primary.main,
          },
          "&.MuiPickersDay-today": {
            borderColor: theme.palette.primary.light,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {},
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:disabled": {
            opacity: 0.4,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          gap: "4px",
          color: theme.palette.primary[50],
          padding: "10px 20px",
          borderRadius: "5px",
          backgroundColor: theme.palette.primary[400],
          ...theme.fonts["button"],
          textTransform: "none",
          "&:hover": {
            backgroundColor: theme.palette.primary[300],
          },
          "&:disabled": {
            backgroundColor: theme.palette.primary[200],
            opacity: 0.6,
          },
        },
        outlined: {
          color: theme.palette.primary[400],
          borderColor: theme.palette.primary[400],
          backgroundColor: theme.palette.secondary.light,
          "&:hover": {
            backgroundColor: theme.palette.primary[100],
          },
          "&:active": {
            backgroundColor: theme.palette.primary[200],
          },
          "&:focus": {
            backgroundColor: theme.palette.secondary.light,
            outline: "none",
          },
          "&:mousedown": {
            backgroundColor: theme.palette.primary[300],
          },
          "&:mouseup, &:blur": {
            backgroundColor: theme.palette.secondary.light,
          },
          "&:disabled": {
            opacity: 0.4,
            backgroundColor: theme.palette.secondary.light,
            borderColor: theme.palette.secondary[300],
          },
        },
        text: {
          color: theme.palette.primary[400],
          backgroundColor: theme.palette.common.white,
          "&:hover": {
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary[100],
          },
        },
      },
    },
  },
});

export default theme;
