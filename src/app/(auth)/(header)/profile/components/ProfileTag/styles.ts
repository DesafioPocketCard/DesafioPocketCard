"use client";

import { Box, styled } from "@mui/material";

const TagContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  "& > span:nth-child(2)": {
    ...theme.fonts["h5-body-large"],
    color: theme.palette.secondary[500],
    textAlign: "center",
  },
}));

export { TagContainer };
