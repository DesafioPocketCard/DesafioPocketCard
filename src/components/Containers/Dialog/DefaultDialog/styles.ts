import { styled, Dialog } from "@mui/material";
import { IDialogProps } from "./types";

const DialogContainer = styled(Dialog)<Pick<IDialogProps, "fullSize">>(({ fullSize }) => ({
  "& > .MuiDialog-container": {
    alignItems: "flex-end",
    "& > .MuiPaper-root": {
      borderRadius: "20px 20px 0 0",
      maxHeight: fullSize ? "none" : "fit-content",
    },
  },
}));

export { DialogContainer };
