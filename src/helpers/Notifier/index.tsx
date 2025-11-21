"use client";

import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { Alert, Snackbar, SnackbarCloseReason, Stack } from "@mui/material";
import { NotifierContext } from "@/contexts/NotifierContext";
import { INotifierActionKind, INotifierProps } from "@/helpers/Notifier/types";
import { createPortal } from "react-dom";

function Notifier({
  show,
  close,
  severity,
  message,
  timeToClose = 3000,
}: INotifierProps) {
  const handleClose = (
    event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    close();
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={show}
        autoHideDuration={timeToClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert
          onClose={
            handleClose as (event: SyntheticEvent<Element, Event>) => void
          }
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

function GlobalNotifier() {
  const [notifierState, dispatch] = useContext(NotifierContext);
  const [portal, setPortal] = useState<HTMLBodyElement | null>(null);

  const closeNotify = () => {
    dispatch({
      type: INotifierActionKind.HIDE_NOTIFICATION,
    });
  };

  useEffect(() => {
    const portalElement: HTMLBodyElement | null =
      document.querySelector("body");
    setPortal(portalElement);
  }, []);

  const component = notifierState.show ? (
    <Notifier
      message={notifierState.message}
      show={notifierState.show}
      severity={notifierState.severity}
      close={closeNotify}
    />
  ) : null;

  return portal ? createPortal(component, portal) : null;
}

export default GlobalNotifier;
