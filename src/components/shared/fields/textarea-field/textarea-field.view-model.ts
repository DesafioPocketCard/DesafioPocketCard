import { useController, FieldValues, Path, Control, ControllerRenderProps } from "react-hook-form";
import { TextareaFieldProps } from "./textarea-field.model";

export interface ITextareaFieldViewModel<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  error: string | undefined;
  label?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
}

export function useTextareaFieldViewModel<TFieldValues extends FieldValues>(
  props: TextareaFieldProps<TFieldValues>,
): ITextareaFieldViewModel<TFieldValues> {
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
    rows: props.rows,
    className: props.className,
    disabled: props.disabled,
  };
}
