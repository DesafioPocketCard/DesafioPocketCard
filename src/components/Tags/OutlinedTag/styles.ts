"use client";

import { styled, Typography, TypographyProps } from "@mui/material";

const TagContainer = styled(Typography)<TypographyProps>(({ theme }) => ({
  padding: "4px 10px",
  borderRadius: "10px",
  border: `1px solid ${theme.palette.secondary[400]}`,
  ...theme.fonts.label,
  color: theme.palette.base["A200"],
}));

export { TagContainer };
