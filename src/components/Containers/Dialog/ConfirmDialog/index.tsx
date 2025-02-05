// components/ConfirmDialog.tsx
import * as React from "react";
import { DialogActions, Button, useTheme } from "@mui/material";
import { DialogStyled, DialogTitleStyled } from "./styles";

interface ConfirmDialogProps {
  open: boolean;
  onClose: (result: boolean) => void;
  handleConfirmation: () => void;
  dialogTitle: string;
}

export default function ConfirmDialog({
  open,
  onClose,
  handleConfirmation,
  dialogTitle,
}: ConfirmDialogProps) {
  const theme = useTheme();
  const handleClose = (result: boolean) => {
    onClose(result);
  };
  return (
    <DialogStyled open={open} onClose={() => handleClose(false)}>
      <DialogTitleStyled>{dialogTitle}</DialogTitleStyled>
      <DialogActions>
        <Button
          style={{ backgroundColor: theme.palette.error[400] }}
          onClick={() => handleClose(false)}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          style={{ backgroundColor: theme.palette.success[400] }}
          onClick={() => handleConfirmation()}
          color="primary"
          autoFocus
        >
          Confirmar
        </Button>
      </DialogActions>
    </DialogStyled>
  );
}
