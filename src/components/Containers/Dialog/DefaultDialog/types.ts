import { DialogProps } from "@mui/material";
import React from "react";

interface IDialogProps extends DialogProps {
  open: boolean;
  fullSize?: boolean;
  handleClose(): void;
  children: React.ReactNode;
}

export type { IDialogProps };
