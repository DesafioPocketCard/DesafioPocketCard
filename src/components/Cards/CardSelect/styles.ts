import { Box, styled } from "@mui/material";

export const CardOption = styled(Box)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    background: selected
      ? theme.palette.primary.dark
      : theme.palette.secondary[50],
    borderRadius: theme.spacing(1),
    "& > p": {
      ...theme.fonts["pf-body"],
      color: selected ? theme.palette.base[50] : theme.palette.secondary[500],
      textWrap: "wrap",
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      "> p": {
        color: theme.palette.base[50],
      },
    },
  }),
);

export const CardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  "& > p": {
    ...theme.fonts["h5-body-large"],
    color: theme.palette.secondary[500],
  },
}));
