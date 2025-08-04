import { Box, Typography } from "@mui/material";
import React from "react";
import { IGridCardProps } from "./types";
import { CardContainer, ProgressBar } from "./styles";
import Image from "next/image";

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
      <Image alt="Desafio" src={icon} unoptimized width={100} height={100} />
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
