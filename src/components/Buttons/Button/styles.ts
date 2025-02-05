"use client";

import { CircularProgress, styled, Button, ButtonProps } from "@mui/material";

const Loading = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.base[50],
}));

const StyledButton = styled(Button)<ButtonProps>(({ theme, variant }) => ({
  backgroundColor: variant === "contained" ? theme.palette.primary[500] : "transparent",
  color: variant === "contained" ? theme.palette.base[50] : theme.palette.primary[500],
  "&:hover": {
    backgroundColor: variant === "contained" ? theme.palette.primary.dark : "transparent",
    color: variant === "contained" ? theme.palette.base[50] : theme.palette.primary[500],
  },
  "&:active": {
    backgroundColor: variant === "contained" ? theme.palette.primary.dark : "transparent",
    boxShadow: theme.shadows[1],
  },
}));

export { Loading, StyledButton };
