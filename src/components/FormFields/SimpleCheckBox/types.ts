import { CheckboxProps } from "@mui/material";
import { Control } from "react-hook-form";

export type ISimpleCheckboxProps = {
  label: string;
  name: string;
  control: Control<any, any>;
  onChange?: (values: any) => void;
  orientation?: "row" | "column";
} & CheckboxProps;
