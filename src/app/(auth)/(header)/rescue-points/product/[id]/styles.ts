"use client";

import { Box, styled } from "@mui/material";

const ProfileImageContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gridTemplateRows: "auto 1fr auto auto",
  position: "relative",
  height: "460px",
  padding: "36px 50px 44px 50px !important",
  margin: " -12px 0 -32px 0",
  "& > img:nth-child(1)": {
    position: "absolute",
    maxWidth: "100%",
    height: "100%",
    top: "0",
    left: "0",
    objectFit: "cover",
  },
  "& > button:nth-child(2), & > button:nth-child(3), & > h1, & > span": {
    zIndex: "1",
  },
  "& > button:nth-child(2)": {
    gridColumn: "1",
  },
  "& > button:nth-child(3)": {
    gridColumn: "-1",
  },
  "& > h1": {
    ...theme.fonts["h3-title"],
    color: theme.palette.base[50],
    gridColumn: "1/-1",
    gridRow: "3",
  },
  "& > span": {
    ...theme.fonts["h5-body-large"],
    color: theme.palette.base[50],
    gridColumn: "1/-1",
    gridRow: "4",
  },
}));

const ProfileInfo = styled(Box)(({ theme }) => ({
  padding: "60px 28px !important",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  "& > h1": {
    ...theme.fonts["h3-title"],
    fontWeight: "bold",
    color: theme.palette.secondary[800],
  },
  "& .description": {
    ...theme.fonts["pf-body"],
    color: theme.palette.secondary[500],
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    "& > div > li": {
      ...theme.fonts["pf-body"],
      color: theme.palette.secondary[500],
      listStyle: "disc",
    },
  },
  "& .rescue-points": {
    ...theme.fonts["h5-body-large"],
    color: theme.palette.secondary[500],
    textAlign: "right",
  },
}));

export { ProfileImageContainer, ProfileInfo };
