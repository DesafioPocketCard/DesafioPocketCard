"use client";

import { Box, styled } from "@mui/material";

const CardContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "2px",
  justifyItems: "center",
  padding: "20px",
  backgroundColor: theme.palette.secondary.light,
  borderRadius: "16px",
  "& > p": {
    ...(theme.fonts?.["h5-body-large"] || {}),
    color: theme.palette.secondary?.["500"] || "#616161",
    "& > span": {
      ...(theme.fonts?.["h4-subtitle"] || {}),
      textTransform: "uppercase",
      color: theme.palette.primary?.["500"] || theme.palette.primary.main,
    },
  },
  "& > button": {
    width: "80%",
    marginTop: "18px",
  },
}));

export { CardContainer };
