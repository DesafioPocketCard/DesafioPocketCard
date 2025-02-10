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
  padding: "40px 20px !important",
  "& > h1": {
    ...theme.fonts["h3-title"],
    color: theme.palette.secondary[500],
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  "& > h2": {
    ...theme.fonts["pf-body"],
    color: theme.palette.secondary[500],
    width: "100%",
    marginBottom: theme.spacing(3),
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
  "& .total": {
    ...theme.fonts["h5-body-large"],
    color: theme.palette.secondary[500],
    textAlign: "right",
    margin: `${theme.spacing(2)} 0`,
  },
  "& > button": {
    width: "100%",
  },
}));

const CartCard = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  padding: `${theme.spacing(2)} 0`,
  borderTop: `1px solid ${theme.palette.secondary[100]}`,
  "& .image": {
    width: "100px",
    height: "100px",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(4),
    overflow: "hidden",
    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  "& .info": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    "& > h3": {
      ...theme.fonts["h6-body-strong"],
      color: theme.palette.secondary[500],
    },
    "& > span": {
      ...theme.fonts["label"],
      color: theme.palette.secondary[50],
      backgroundColor: theme.palette.primary.main,
      padding: "4px 8px",
      borderRadius: theme.spacing(1),
      width: "fit-content",
    },
    "& .remove": {
      ...theme.fonts["label"],
      color: theme.palette.secondary[500],
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(0.5),
      borderRadius: theme.spacing(1),
      width: "fit-content",
      padding: "4px 8px 4px 0px",
      cursor: "pointer",
      userSelect: "none",
      ":active": {
        backgroundColor: theme.palette.secondary[50],
      },
    },
  },
}));

export { TitleContainer, Container, HeaderContainer, CartCard };
