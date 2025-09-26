import { List, styled } from "@mui/material";

const MenuList = styled(List)(({ theme }) => ({
  maxHeight: "100%",
  overflowY: "auto",
  "& li": {
    padding: 0,
    "& span": {
      ...(theme.fonts?.["h5-body-large"] || {}),
      color: theme.palette.secondary?.["500"] || "#616161",
    },
    "& .MuiButtonBase-root": {
      display: "flex",
      gap: "20px",
      padding: "12px 30px",
      "& div": {
        minWidth: "0px",
      },
    },
  },
}));

export { MenuList };
