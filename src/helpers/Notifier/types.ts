import { ContextAction } from "@/types/ContextAction";
import { SyntheticEvent } from "react";

export type NotifierSeverity = "success" | "info" | "warning" | "error";

export type INotifier = {
  show?: boolean;
  message: string;
  severity: NotifierSeverity;
};

export enum INotifierActionKind {
  SHOW_NOTIFICATION = "SHOW_NOTIFICATION",
  HIDE_NOTIFICATION = "HIDE_NOTIFICATION",
}

export type INotifierProps = INotifier & {
  close: () => void;
  timeToClose?: number;
};



export type INotifierAction = ContextAction<INotifierActionKind, INotifier>;
