"use client";

import { Box, styled } from "@mui/material";

const ErrorBoundaryContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  height: "100vh",
  maxHeight: "100%",
  alignItems: "center",
  justifyContent: "center",
  "& > div ": {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    "& > h1": {
      ...(theme.fonts?.["h3-title"] || {}),
      color: theme.palette.base?.["900"] || "#404040",
    },
    "& > svg ": {
      width: "52px",
      height: "52px",
    },
  },
  "& > p": {
    ...(theme.fonts?.["label"] || {}),
    color: theme.palette.base?.["600"] || "#9C9C9C",
    marginBottom: "12px",
  },
}));

export { ErrorBoundaryContainer };
