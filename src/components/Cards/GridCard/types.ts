import { SxProps } from "@mui/material";
import React from "react";

export interface IGridCardProps {
  title: string;
  progress: number;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  sx?: SxProps;
}
