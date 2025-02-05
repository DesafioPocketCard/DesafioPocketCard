import { ReactNode } from "react";
import { IDialogProps } from "../DefaultDialog/types";

export type IMenuOptions = {
  icon?: ReactNode;
  label: string;
  handler?: () => void;
};

interface IDialogMenuProps extends Omit<IDialogProps, "children"> {
  headerComponent?: ReactNode;
  options: IMenuOptions[];
}

export type { IDialogMenuProps };
