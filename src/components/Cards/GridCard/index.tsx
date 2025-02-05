import { Box, Typography } from "@mui/material";
import React from "react";
import { IGridCardProps } from "./types";
import { CardContainer, ProgressBar } from "./styles";

export default function GridCard({
  icon,
  title,
  progress,
  onClick,
  sx,
  disabled,
}: IGridCardProps) {
  return (
    <CardContainer
      onClick={() => !disabled && onClick()}
      sx={sx}
      disabled={disabled}
    >
      <Box className="icon-container">{icon}</Box>
      <Typography component="h1">{title}</Typography>
      <ProgressBar percentage={progress}>
        <Box>
          <Box className="container" />
          <Box className="progress" />
        </Box>
        <Typography component="h1">{progress}%</Typography>
      </ProgressBar>
    </CardContainer>
  );
}
