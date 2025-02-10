"use client";

import { Box, styled } from "@mui/material";

export const ProgressBar = styled(Box)<{
  percentage: number;
}>(({ theme, percentage }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "20px",
  "> div": {
    width: "100%",
    height: "12px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    "> .container": {
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.secondary[100],
      borderRadius: "2px",
    },
    "> .progress": {
      width: `${percentage}%`,
      height: "90%",
      position: "absolute",
      backgroundColor: theme.palette.primary[500],
      borderRadius: "2px",
    },
  },
  "> h1": {
    ...theme.fonts["label"],
    color: theme.palette.secondary[500],
    fontWeight: "bold",
  },
}));

export const CardContainer = styled(Box)<{
  disabled?: boolean;
}>(({ theme, disabled }) => ({
  width: "100%",
  opacity: disabled ? 0.5 : 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  "& > h1": {
    ...theme.fonts["h6-body-strong"],
    color: theme.palette.secondary[500],
    textAlign: "center",
  },
  "& > .icon-container": {
    borderRadius: "16px",
    width: "100%",
    minHeight: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.secondary[50],
    position: "relative",
    "& .points-container": {
      position: "absolute",
      bottom: 2,
      right: 2,
      borderRadius: "8px",
      backgroundColor: theme.palette.primary[500],
      padding: "4px 8px",
      "& > span": {
        ...theme.fonts["label"],
        color: theme.palette.secondary[50],
        fontWeight: "bold",
      },
    },
    "& .label-top-container": {
      position: "absolute",
      top: 2,
      left: 2,
      borderRadius: "8px",
      backgroundColor: theme.palette.warning[600],
      padding: "4px 8px",
      "& > span": {
        ...theme.fonts["label"],
        color: theme.palette.secondary[50],
        fontWeight: "bold",
      },
    },
  },
}));
