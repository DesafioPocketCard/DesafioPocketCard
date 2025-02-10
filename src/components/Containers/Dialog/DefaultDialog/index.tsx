"use client";

import React from "react";
import { IDialogProps } from "./types";
import { DialogContainer } from "./styles";
import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any>;
    },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

function DefaultDialog({
  open,
  handleClose,
  fullSize = true,
  children,
  ...props
}: IDialogProps) {
  return (
    <DialogContainer
      open={open}
      onClose={handleClose}
      fullScreen
      TransitionComponent={Transition}
      fullSize={fullSize}
      {...props}
    >
      {children}
    </DialogContainer>
  );
}

export default DefaultDialog;
