import { Theme } from "@mui/material";

const muiStylesComponents = (theme: Theme) => ({
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

export default muiStylesComponents;
