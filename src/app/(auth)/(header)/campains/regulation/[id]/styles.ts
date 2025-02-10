"use client";

import { Box, styled } from "@mui/material";

const TitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  color: theme.palette.base[50],
  padding: "42px 12px 62px 12px !important",
  "& > p": {
    ...theme.fonts["h3-title"],
  },
  "& > span": {
    ...theme.fonts["label"],
  },
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "auto 1fr auto",
  marginTop: "32px",
  alignItems: "center",
  "& > h1, & > p": {
    gridColumn: "2 / -1",
  },
  "& > h1": {
    ...theme.fonts["h3-title"],
    color: theme.palette.common.white,
  },
  "& > p": {
    ...theme.fonts["h5-body-large"],
    color: theme.palette.common.white,
    margin: "12px 0 -20px 0",
  },
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  padding: "40px 28px 12px 28px !important",
  "& > h1": {
    ...theme.fonts["h3-title"],
    color: theme.palette.secondary[500],
    marginBottom: "32px",
    width: "100%",
    textAlign: "center",
  },
  "& > h2": {
    ...theme.fonts["h6-body-strong"],
    color: theme.palette.primary[500],
    width: "100%",
  },
  "& > p": {
    ...theme.fonts["pf-body"],
    width: "100%",
    color: theme.palette.secondary[500],
  },
  "& > li": {
    ...theme.fonts["pf-body"],
    width: "100%",
    listStyle: "disc",
    color: theme.palette.secondary[500],
  },
  "& > button": {
    width: "100%",
  },
}));

export { TitleContainer, Container, HeaderContainer };
