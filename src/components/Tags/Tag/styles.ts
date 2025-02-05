"use client";

import { styled, Typography, TypographyProps } from "@mui/material";

const TagContainer = styled(Typography)<TypographyProps>(({ theme }) => ({
  padding: "10px",
  borderRadius: "10px",
  backgroundColor: theme.palette.secondary.light,
  ...theme.fonts["h3-title"],
  color: theme.palette.primary["500"],
}));

export { TagContainer };
