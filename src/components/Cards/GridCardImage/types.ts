import { SxProps } from "@mui/material";
import React from "react";

export interface IGridCardImageProps {
  title: string;
  icon: string;
  onClick: () => void;
  disabled?: boolean;
  sx?: SxProps;
  points?: number | string;
  labelTop?: string;
}
