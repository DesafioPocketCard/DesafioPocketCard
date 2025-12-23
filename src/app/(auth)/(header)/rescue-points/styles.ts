"use client";

import { Box, styled } from "@mui/material";

const TitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  color: theme.palette.base?.["50"] || "#FFFFFF",
  padding: "42px 12px 62px 12px !important",
  "& > p": {
    ...(theme.fonts?.["h3-title"] || {}),
  },
  "& > span": {
    ...(theme.fonts?.["label"] || {}),
  },
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  position: "relative",
  "& > h1, & > p": {
    gridColumn: "2 / -1",
  },
  "& > h1": {
    ...(theme.fonts?.["h3-title"] || {}),
    color: theme.palette.common.white,
  },
  "& > p": {
    ...(theme.fonts?.["h5-body-large"] || {}),
    color: theme.palette.common.white,
    margin: "12px 0 -20px 0",
  },
  "& .badge": {
    position: "absolute",
    top: 8,
    right: 12,
    color: theme.palette.primary?.["900"] || theme.palette.primary.main,
  },
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  padding: "40px 0px 12px 0px !important",
  "& > h1": {
    ...(theme.fonts?.["h3-title"] || {}),
    color: theme.palette.secondary?.["500"] || "#616161",
    marginBottom: "32px",
    width: "100%",
    textAlign: "center",
  },
  "& > h2": {
    ...(theme.fonts?.["h6-body-strong"] || {}),
    color: theme.palette.primary?.["500"] || theme.palette.primary.main,
    width: "100%",
  },
  "& > p": {
    ...(theme.fonts?.["pf-body"] || {}),
    width: "100%",
    color: theme.palette.secondary?.["500"] || "#616161",
  },
  "& > li": {
    ...(theme.fonts?.["pf-body"] || {}),
    width: "100%",
    listStyle: "disc",
    color: theme.palette.secondary?.["500"] || "#616161",
  },
  "& > button": {
    width: "100%",
    marginTop: "32px",
  },
}));

const GridContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr", // Duas colunas
  gap: theme.spacing(2), // Adiciona espaçamento (16px) entre os cards
  alignItems: "stretch", // Faz os cards terem a mesma altura na linha
  
  // Removemos ou ajustamos o seletor "& > div" antigo que centralizava tudo e quebrava o alinhamento
  "& > div": {
    width: "100%", // Garante que o card ocupe o espaço da coluna
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center", // <-- REMOVA ISSO para o card não flutuar no meio
  },
}));

const Title = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  "& > h1": {
    ...(theme.fonts?.["h4-subtitle"] || {}),
    color: theme.palette.secondary?.["500"] || "#616161",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: "12px",
  },
  "& > p": {
    ...(theme.fonts?.["h5-body-large"] || {}),
    textAlign: "center",
    color: theme.palette.secondary?.["300"] || "#959595",
  },
}));

export { TitleContainer, Container, HeaderContainer, GridContainer, Title };
