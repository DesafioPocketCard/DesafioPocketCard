import React from "react";
import { useController, FieldValues, Path, Control, ControllerRenderProps } from "react-hook-form";
import { TextFieldProps } from "./text-field.model";

export interface ITextFieldViewModel<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  error: string | undefined;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function useTextFieldViewModel<TFieldValues extends FieldValues>(
  props: TextFieldProps<TFieldValues>,
): ITextFieldViewModel<TFieldValues> {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control as Control<TFieldValues>,
  });

  return {
    field,
    error: error?.message,
    label: props.label,
    placeholder: props.placeholder,
    type: props.type,
    leftIcon: props.leftIcon,
    rightIcon: props.rightIcon,
    className: props.className,
    disabled: props.disabled,
  };
}
