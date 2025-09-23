import { Box, Typography } from "@mui/material";
import React from "react";
import { IGridCardImageProps } from "./types";
import { CardContainer } from "./styles";
import Image from "next/image";

export default function GridCardImage({
  icon,
  title,
  onClick,
  sx,
  disabled,
  points,
  labelTop,
}: IGridCardImageProps) {
  return (
    <CardContainer
      onClick={() => !disabled && onClick()}
      sx={sx}
      disabled={disabled}
    >
      <Box className="icon-container">
        {labelTop && (
          <Box className="label-top-container">
            <Typography component="span">{labelTop}</Typography>
          </Box>
        )}
        <Image alt="not found" src={icon} unoptimized fill />
        {points && (
          <Box className="points-container">
            <Typography component="span">{points} pts</Typography>
          </Box>
        )}
      </Box>
      <Typography component="h1">{title}</Typography>
    </CardContainer>
  );
}
