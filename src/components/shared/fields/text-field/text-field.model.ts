import { ReactNode } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

export interface TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  disabled?: boolean;
}
