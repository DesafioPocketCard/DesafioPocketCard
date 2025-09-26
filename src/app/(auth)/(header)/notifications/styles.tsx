"use client";

import { Box, styled } from "@mui/material";

const TitleContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "2px",
  justifyItems: "center",
  padding: "56px 12px 32px 12px !important",
  "& > span": {
    color: theme.palette.base?.["50"] || "#FFFFFF",
  },
  "& > span:nth-child(2)": {
    ...(theme.fonts?.["h5-body-large"] || {}),
  },
  "& > span:nth-child(3)": {
    ...(theme.fonts?.["h3-title"] || {}),
  },
}));

const NotificationsList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "50px",
  alignItems: "center",
  padding: "28px 12px !important",
  "& > li": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "26px",
    "& > ul": {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
  },
});

export { TitleContainer, NotificationsList };
