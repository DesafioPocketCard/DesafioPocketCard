"use client";

import { Box, styled } from "@mui/material";

interface IWrapper {
  $hasHeader: boolean;
  $fillSize?: boolean;
}

const Wrapper = styled(Box)<IWrapper>(({ theme, $hasHeader: hasHeader, $fillSize: fillSize }) => ({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  minHeight: "100vh",
  margin: fillSize ? "-12px" : "0",
  backgroundColor: hasHeader ? theme.palette.primary?.["500"] || theme.palette.primary.main : "none",
  "& > .radial-header-component": {
    padding: "12px",
  },
  "& > .radial-body-component": {
    padding: "12px",
    borderRadius: "40px 40px 0 0",
    backgroundColor: theme.palette.base?.["50"] || "#FFFFFF",
  },
}));

export { Wrapper };
