import React from "react";
import { FieldValues } from "react-hook-form";
import { TextFieldProps } from "./text-field.model";
import { useTextFieldViewModel } from "./text-field.view-model";
import { TextFieldView } from "./text-field.view";

export default function TextFieldComponent<TFieldValues extends FieldValues>(
  props: TextFieldProps<TFieldValues>,
) {
  const viewModel = useTextFieldViewModel(props);
  const { field, error, ...restProps } = viewModel;
  return <TextFieldView {...restProps} field={field} error={error} />;
}
