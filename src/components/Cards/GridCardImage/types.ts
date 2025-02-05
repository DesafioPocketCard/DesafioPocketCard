import { SxProps } from "@mui/material";
import React from "react";

export interface IGridCardImageProps {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    disabled?: boolean,
    sx?: SxProps,
    points?: number,
    labelTop?: string,
}