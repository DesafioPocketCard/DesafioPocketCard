"use client";

import { Box, styled } from "@mui/material";

const TitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.base?.["50"] || "#FFFFFF",
  padding: "52px 12px 64px 12px !important",
  "& > img": {
    marginBottom: "32px",
  },
  "& > p": {
    ...(theme.fonts?.["h3-title"] || {}),
    marginBottom: "4px",
  },
  "& > span": {
    ...(theme.fonts?.["label"] || {}),
  },
}));

const Menu = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px 28px 12px 28px !important",
  gap: "32px",
  "& > h1": {
    ...(theme.fonts?.["h3-title"] || {}),
    color: theme.palette.primary?.["500"] || theme.palette.primary.main,
    textAlign: "center",
    marginBottom: "40px",
  },
  "& > button": {
    ...(theme.fonts?.["h5-body-large"] || {}),
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    width: "100%",
  },
  "& > p": {
    ...(theme.fonts?.["label"] || {}),
    color: theme.palette.secondary?.["200"] || "#B6B6B6",
    textAlign: "center",
    marginTop: "auto",
    "& > a": {
      ...(theme.fonts?.["label"] || {}),
      display: "block",
      color: theme.palette.primary.main,
      userSelect: "none",
    },
  },
}));

export { Menu, TitleContainer };
