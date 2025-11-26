"use client";

import { Box, Divider as MUIDivder, styled } from "@mui/material";

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  "& > h1, & > p": {
    gridColumn: "2 / -1",
  },
  "& > h1": {
    ...(theme.fonts?.["h3-title"] || {}),
    color: theme.palette.secondary?.["500"] || "#616161",
  },
  "& > p": {
    ...(theme.fonts?.["h5-body-large"] || {}),
    color: theme.palette.secondary?.["500"] || "#616161",
    margin: "12px 0 20px 0",
  },
  "& > div": {
    gridColumn: "1 / 3",
  },
  "& > button:nth-child(5)": {
    marginLeft: "16px",
  },
}));

const Divider = styled(MUIDivder)({
  width: "60%",
  borderColor: "rgba(0, 0, 0, 0.16)",
  margin: "32px auto",
});

const CardList = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "28px",
}));

export { HeaderContainer, Divider, CardList };
