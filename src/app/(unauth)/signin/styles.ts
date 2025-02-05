"use client";

import { Box, styled } from "@mui/material";

const Politicy = styled(Box)(({ theme }) => ({
  ...theme.fonts["label"],
  color: theme.palette.secondary[200],
  maxWidth: "60%",
  textAlign: "center",
  marginTop: "auto",
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: "128px 24px 24px 24px !important",
  "& > a": {
    ...theme.fonts["label"],
    color: theme.palette.base[900],
    transition: "0.3s",
    "&:hover": {
      color: theme.palette.primary[400],
    },
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  height: "200px",
  position: "relative",
  "& > div": {
    position: "absolute",
    left: "50%",
    top: "100px",
    transform: "translate(-50%, 0%)",
    backgroundColor: "#ffffff55",
    border: "1px solid #F9F9F9",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(3),
    "& > img": {
    },
  },
}));

export { FormContainer, Politicy, LogoContainer };
