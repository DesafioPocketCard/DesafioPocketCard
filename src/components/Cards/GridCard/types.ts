import { SxProps } from "@mui/material";
import React from "react";

export interface IGridCardProps {
  title: string;
  progress: number;
  icon: string;
  onClick: () => void;
  disabled?: boolean;
  sx?: SxProps;
}
