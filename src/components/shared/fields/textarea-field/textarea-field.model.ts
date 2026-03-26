import { ReactNode } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

export interface TextareaFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
}
