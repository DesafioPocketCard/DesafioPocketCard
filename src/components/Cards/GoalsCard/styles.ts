import { Box, styled } from "@mui/material";

const CardContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  rowGap: "2px",
  columnGap: "16px",
  gridTemplateColumns: "100px 1fr auto",
  width: "100%",
  padding: "10px 8px 10px 10px",
  borderRadius: "16px",
  backgroundColor: theme.palette.secondary.light,
  "& > span:nth-child(2)": {
    ...theme.fonts["h4-subtitle"],
    color: theme.palette.primary[500],
  },
  "& > span": {
    gridColumn: "2 / -1",
    ...theme.fonts["pf-body"],
    color: theme.palette.secondary[400],
  },
  "& > img": {
    gridRow: "1 / 5",
    borderRadius: "16px",
  },
  "& > button": {
    justifySelf: "end",
  },
}));

export { CardContainer };
