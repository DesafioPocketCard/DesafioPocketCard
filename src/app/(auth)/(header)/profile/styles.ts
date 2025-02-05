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

const ProfileInfo = styled(Box)({
  padding: "40px 12px !important",
  zIndex: "2",
  "& > hr": {
    borderColor: "rgba(0, 0, 0, 0.16)",
    borderWidth: "1px",
    margin: "12px 0 32px 0",
  },
});

const Insights = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "12px",
  "& > hr": {
    height: "40px",
    borderColor: "rgba(0, 0, 0, 0.16)",
    borderWidth: "1px",
  },
});

const Informations = styled(Box)(({ theme }) => ({
  display: "grid",
  justifyItems: "center",
  gap: "20px",
  "& > h2": {
    ...theme.fonts["h3-title"],
    color: theme.palette.primary[500],
  },
  "& > div:nth-child(2)": {
    marginBottom: "20px",
  },
  "& > button": {
    ...theme.fonts["h6-body-strong"],
    borderRadius: "0",
    padding: "4px",
    borderBottom: `1px solid ${theme.palette.primary[500]}`,
    "&:hover": {
      boxShadow: "none",
    },
  },
}));

export { ProfileImageContainer, ProfileInfo, Insights, Informations };
