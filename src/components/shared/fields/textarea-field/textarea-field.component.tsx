import React from "react";
import { FieldValues } from "react-hook-form";
import { TextareaFieldProps } from "./textarea-field.model";
import { useTextareaFieldViewModel } from "./textarea-field.view-model";
import { TextareaFieldView } from "./textarea-field.view";

export default function TextareaFieldComponent<TFieldValues extends FieldValues>(
  props: TextareaFieldProps<TFieldValues>,
) {
  const viewModel = useTextareaFieldViewModel(props);
  const { field, error, ...restProps } = viewModel;
  return <TextareaFieldView {...restProps} field={field} error={error} />;
}
