import { Box, styled } from "@mui/material";

const PaginatedContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  paddingRight: "12px",
  "& > span": {
    marginLeft: "auto",
    marginRight: "auto",
    ...(theme.fonts?.["label"] || {}),
    color: theme.palette.primary?.["400"] || theme.palette.primary.main,
  },
}));

export { PaginatedContainer };
