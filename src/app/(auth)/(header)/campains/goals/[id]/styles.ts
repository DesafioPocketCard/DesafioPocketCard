"use client";

import { Box, Divider as MUIDivder, Typography, styled } from "@mui/material";

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  "& > div": {
    width: "100%",
    textAlign: "center",
    "& > h1": {
      ...(theme.fonts?.["h4-subtitle"] || {}),
      color: theme.palette.secondary?.["500"] || "#616161",
      "& > span": {
        ...(theme.fonts?.["h4-subtitle"] || {}),
        color: theme.palette.primary?.["500"] || theme.palette.primary.main,
      },
    },
    "& > p": {
      ...(theme.fonts?.["label"] || {}),
      color: theme.palette.secondary?.["500"] || "#616161",
    },
    "& > strong": {
      ...(theme.fonts?.["h6-body-strong"] || {}),
      color: theme.palette.secondary?.["500"] || "#616161",
      "& > span": {
        color: theme.palette.primary?.["300"] || theme.palette.primary.main,
      },
    },
  },
}));

const Divider = styled(MUIDivder)({
  width: "100%",
  borderColor: "rgba(0, 0, 0, 0.16)",
  margin: "20px auto",
  borderStyle: "dashed",
});

const CardList = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "28px",
}));

const ProgressLabel = styled(Typography)(({ theme }) => ({
  ...(theme.fonts?.["label"] || {}),
  color: theme.palette.secondary?.["500"] || "#616161",
  textAlign: "center",
}));

const ProgressBar = styled(Box)<{ percentage: number }>(
  ({ theme, percentage }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
    "> div": {
      width: "100%",
      height: "16px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      "> .container": {
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.secondary?.["100"] || "#CECECE",
        borderRadius: "2px",
      },
      "> .progress": {
        width: `${percentage}%`,
        margin: "0 4px 0 4px",
        height: "75%",
        position: "absolute",
        backgroundColor: theme.palette.primary?.["500"] || theme.palette.primary.main,
        borderRadius: "2px",
      },
    },
    "> h1": {
      ...(theme.fonts?.["h4-subtitle"] || {}),
      color: theme.palette.primary?.["500"] || theme.palette.primary.main,
      fontWeight: "bold",
    },
  }),
);

const Description = styled(Typography)(({ theme }) => ({
  ...(theme.fonts?.["h4-subtitle"] || {}),
  textAlign: "center",
  color: theme.palette.secondary?.["300"] || "#959595",
  marginBottom: "20px",
}));

const GridContainer = styled(Box)(({ theme, key }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  "& > div": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export {
  HeaderContainer,
  Divider,
  CardList,
  ProgressBar,
  Description,
  ProgressLabel,
  GridContainer,
};
