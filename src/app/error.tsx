"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { Button } from "@/components/Buttons";
import { ErrorBoundaryContainer } from "./styles/errorBoundary";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const theme = useTheme();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <ErrorBoundaryContainer>
      <Box>
        <ErrorOutlineRoundedIcon htmlColor={theme.palette.primary?.["400"] || theme.palette.primary.main} />
        <Typography component="h1">Ops...</Typography>
      </Box>
      <Typography component="p">
        Algo aconteceu, mas não desista, tente novamente!
      </Typography>
      <Button size="large" onClick={reset}>
        Tentar novamente
      </Button>
    </ErrorBoundaryContainer>
  );
}
